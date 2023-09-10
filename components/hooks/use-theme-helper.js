import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const useThemeHelper = () => {
  const { theme } = useTheme();
  const [themStatus, setColor] = useState({
    dark: theme === 'dark',
  });

  useEffect(() => {
    setColor({
      dark: theme === 'dark',
    });
  }, [theme]);

  return themStatus;
};

export default useThemeHelper;
