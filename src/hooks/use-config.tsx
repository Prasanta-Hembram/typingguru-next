import { childProps } from '@src/interfaces/index';

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface ICustomStory {}

type ISetState<T = any> = (fn: ((val: T) => T) | T) => void;
type IPage = 'home' | 'about' | 'contact' | 'blog' | 'projects' | '404';

interface ILessonInfo {
  index: number;
}

interface IConfig {
  lessonInfo: ILessonInfo;
  page: IPage;
  darkMode: boolean;
  customStories: ICustomStory[];
}

interface IConfigContext {
  config: IConfig;
  setConfig: Dispatch<SetStateAction<IConfig>>;
}

const defaultConfig: IConfig = {
  lessonInfo: {
    index: 0,
  },
  page: 'home',
  customStories: [],
  darkMode: true,
};

const ConfigContext = createContext<IConfigContext>({
  config: defaultConfig,
  setConfig: () => {},
});

const ConfigProvider = ({ children }: childProps) => {
  const loadConfig = (): IConfig => {
    // load config from local storage

    if (typeof window !== 'undefined') {
      const config = localStorage.getItem('config');
      if (config) {
        return JSON.parse(config);
      }
    }

    return defaultConfig;
  };

  const [config, setConfig] = useState<IConfig>(() => loadConfig());

  useEffect(() => {
    if (typeof window === 'undefined') {
      localStorage.setItem('config', JSON.stringify(config));
    }
  }, [config]);

  return (
    <ConfigContext.Provider
      value={useMemo(
        () => ({
          config,
          setConfig,
        }),
        [config]
      )}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }

  const { config, setConfig } = context;

  const { page, lessonInfo } = config;

  const setPage = (page: IPage) => {
    setConfig((prev) => ({ ...prev, page }));
  };

  const setLessonInfo: ISetState<ILessonInfo> = (lessonInfo) => {
    if (typeof lessonInfo === 'function') {
      setConfig((prev) => ({
        ...prev,
        lessonInfo: lessonInfo(prev.lessonInfo),
      }));
      return;
    }
    setConfig((prev) => ({ ...prev, lessonInfo }));
  };

  return { config, setConfig, setPage, page, setLessonInfo, lessonInfo };
};

export default ConfigProvider;
