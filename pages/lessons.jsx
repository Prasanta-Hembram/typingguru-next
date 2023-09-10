import Header from '@components/atoms/header';
import { motion } from 'framer-motion';
import { createRef, useEffect, useState } from 'react';
import Keyboard from '@components/templates/keyboard';
import { configsContext } from '@commons/context/recoil-context';
import { toast } from 'react-toastify';
import lessonList from '@components/lessons/lesson-list';
import { shiftOnKeyList } from '@components/lessons';
import classNames from 'classnames';
import CBody from '@components/atoms/cbody';

import { usePersistentRecoilState } from '@components/hooks/use-recoil-presist';

const Lessons = () => {
  // Handle focus of the keyboard
  const myref = createRef();
  useEffect(() => {
    if (!myref.current) return;
    myref.current.focus();
  }, [myref]);

  const strLen = 16;

  const [grandMainStrng, setgrandMainStrng] = useState(lessonList[0]);

  const [speed, setspeed] = useState(null);
  const [mainString, setmainString] = useState('');
  const [halfFirst, sethalfFirst] = useState('');
  const [halfSecond, sethalfSecond] = useState('');
  const [activeKey, setactiveKey] = useState(null);
  const [wrongKey, setwrongKey] = useState(null);
  const [index, setindex] = useState(0);
  // const [lsnIndex, setlsnIndex] = useState(0);
  const [refresh, setrefresh] = useState(true);
  const [wrongInputCount, setwrongInputCount] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  const [configs, setConfigs] = usePersistentRecoilState(configsContext);

  const [hintText, sethintText] = useState('');
  const isShiftOn = (key) => {
    if (!key) return false;
    if (shiftOnKeyList.indexOf(key) !== -1) return true;
    return false;
  };

  const _handleKeyDown = (event) => {
    if (event && event.key === mainString[index % strLen]) {
      if (index + 1 >= grandMainStrng.length) {
        if (configs.lsnIndex >= lessonList.length) {
          toast.success('You have completed all lessons');
          return;
        }
        setindex(0);
        setgrandMainStrng(lessonList[configs.lsnIndex + 1]);
        setConfigs((s) => ({ ...s, lsnIndex: configs.lsnIndex + 1 }));
        return;
      }
      setindex(index + 1);
    }

    setactiveKey({
      key: mainString[index % strLen] ? mainString[index % strLen] : null,
      shiftKey: isShiftOn(mainString[index % strLen]),
    });
    setwrongKey(
      event && event.key === mainString[index % strLen] ? null : event
    );
    if (event && !(event.key === mainString[index % strLen])) {
      setwrongInputCount((s) => s + 1);
    }
  };

  const handleStrings = () => {
    sethalfFirst(mainString.substring(0, index % strLen));
    sethalfSecond(mainString.substring(index % strLen, mainString.length));
    sethintText(
      grandMainStrng.substring(
        index - (index % strLen) + strLen,
        index - (index % strLen) + strLen + 8
      )
    );
    _handleKeyDown(null);
  };

  function diffSeconds(dt2, dt1) {
    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(diff);
  }

  // useeffect to run the function on every interval

  useEffect(() => {
    const interval = setTimeout(() => {
      // console.log('refresh');
      // console.log(speed);
      if (!speed) {
        // console.log(!speed);
        setspeed({
          speed: 0,
          start: new Date(),
          end: 0,
        });
      } else {
        if (
          speed.end !== 0 &&
          speed.end.getSeconds() === new Date().getSeconds()
        ) {
          // console.log(true, 'skiped');
          return;
        }

        setspeed((s) => {
          return {
            ...s,
            end: new Date(),
            speed: (
              grandMainStrng.substring(0, index).split(' ').length /
              diffSeconds(new Date(), speed.start)
            ).toFixed(0),
          };
        });
        setAccuracy(
          Number((((index - wrongInputCount) / index) * 100 || 100).toFixed(0))
        );
      }
    }, 1);
    return () => clearInterval(interval);
  }, [grandMainStrng, index, speed, setspeed]);

  useEffect(() => {
    setmainString(
      grandMainStrng.substring(
        index - (index % strLen),
        index - (index % strLen) + strLen
      )
    );
    handleStrings();
  }, [index, strLen, mainString, refresh]);

  useEffect(() => {
    setgrandMainStrng(lessonList[configs.lsnIndex]);
    setindex(0);
    setwrongInputCount(0);
    setspeed(null);
    handleStrings();
    setrefresh(!refresh);
  }, [configs.lsnIndex]);

  useEffect(() => {
    setspeed(null);
    setindex(0);
    setwrongInputCount(0);
  }, [configs.language]);

  return (
    <CBody>
      <Header
        {...{
          index,
          lsnIndex: configs.lsnIndex,
          speed,
          accuracy,
          page: 'Lessons',
        }}
        isWithLesson
      />
      <div
        className={classNames('flex flex-col items-center py-12 gap-6 flex-1', {
          'justify-center relative pb-24': !configs.Keyboard,
          'justify-end': configs.Keyboard,
        })}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.25 }}
          className={classNames(
            'typing-view relative bottom-16 xl:bottom-12',
            configs.language
          )}
        >
          <div>
            <span>
              {mainString.replace(/ /g, '\u00a0')}
              <span className="virtual">
                {hintText.replace(/ /g, '\u00a0')}
              </span>
            </span>
          </div>
          <div>
            <span className="text-primary-500">
              {halfFirst.replace(/ /g, '\u00a0')}
            </span>
            <span title="home">{halfSecond.replace(/ /g, '\u00a0')}</span>
            <input
              inputMode="none"
              maxLength={1}
              id="inp"
              ref={myref}
              type="text"
              onBlur={() => {
                myref.current.focus();
              }}
              autoComplete="off"
              onKeyPress={_handleKeyDown}
            />
          </div>
        </motion.div>

        {configs.Keyboard && (
          <div className="flex max-w-screen-xl w-full">
            <Keyboard
              showHand={configs.Hands}
              activeKey={activeKey}
              wrongKey={wrongKey}
              className={`${configs.language} day`}
            />
          </div>
        )}
      </div>
    </CBody>
  );
};

export default Lessons;
