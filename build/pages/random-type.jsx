import Header from '@components/atoms/header';
import Footer from '@components/atoms/footer';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Keyboard from '@components/templates/keyboard';
import { useRecoilValue } from 'recoil';
import { configsContext } from '@commons/context/recoil-context';
import classNames from 'classnames';
import CBody from '@components/atoms/cbody';

const RandomType = () => {
  const configs = useRecoilValue(configsContext());

  const [activeKey, setactiveKey] = useState(null);
  const [value, setValue] = useState('');

  return (
    <CBody>
      <Header
        {...{
          page: 'Random Type',
          isRandomType: true,
        }}
      />

      <div
        className={classNames('flex flex-col items-center py-12 gap-6 flex-1', {
          'justify-center relative pb-24': !configs.Keyboard,
          'justify-end': configs.Keyboard,
        })}
      >
        <motion.textarea
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.25 }}
          spellCheck="false"
          autoComplete="off"
          autoCorrect="off"
          className={`freeTA tracking-wide font-roboto_mono text-base max-w-screen-sm bg-primary-100 dark:bg-[#25282a] shadow-xl rounded-lg p-3 relative bottom-16 xl:bottom-12 w-full  min-h-[10rem] ${configs.language}`}
          onKeyPress={(e) => setactiveKey(e)}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        {configs.Keyboard && (
          <div className="flex max-w-screen-xl w-full">
            <Keyboard
              showHand={configs.Hands}
              activeKey={activeKey}
              // wrongKey={wrongKey}
              className={`${configs.language} day`}
            />
          </div>
        )}
      </div>
      <Footer />
    </CBody>
  );
};

export default RandomType;
