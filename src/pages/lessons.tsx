import { motion } from 'framer-motion';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import lessonList from '@src/lessons/lesson-list';
import { useConfig } from '@src/hooks/use-config';
import lessons from '@src/lessons';
import CBody from '@src/components/container-body';
import Header from '@src/components/heading';
import Keyboard from '@src/components/keyboard';
import { IKey } from '@src/components/keyboard/key';

const Lessons = () => {
  const myref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!myref.current) return;
    myref.current.focus();
  }, [myref]);

  const strLen = 16;

  const [grandMainStrng, setgrandMainStrng] = useState(lessonList[0]);

  const [mainString, setmainString] = useState('');
  const [halfFirst, sethalfFirst] = useState('');
  const [halfSecond, sethalfSecond] = useState('');
  const [activeKey, setactiveKey] = useState<IKey | null>(null);
  const [wrongKey, setwrongKey] = useState<IKey | null>(null);
  const [refresh, setrefresh] = useState(true);
  const [wrongInputCount, setwrongInputCount] = useState(0);

  const {
    lessonInfo,
    setLessonInfo,
    speed,
    setSpeed,
    language,
    visibleCards,
    setAccuracy,
  } = useConfig();

  const { cursorIndex } = lessonInfo;

  const setIndex = (val: number) => {
    setLessonInfo((s) => ({ ...s, cursorIndex: val }));
  };

  const [hintText, sethintText] = useState('');
  const isShiftOn = (key: string) => {
    if (!key) return false;
    if (lessons.shiftOnKeyList.indexOf(key) !== -1) return true;
    return false;
  };

  const _handleKeyDown = (event: KeyboardEvent<HTMLDivElement> | null) => {
    if (event && event.key === mainString[cursorIndex % strLen]) {
      if (cursorIndex + 1 >= grandMainStrng.length) {
        if (lessonInfo.index >= lessonList.length) {
          toast.success('You have completed all lessons');
          return;
        }
        setIndex(0);
        setgrandMainStrng(lessonList[lessonInfo.index + 1]);
        setLessonInfo((s) => ({ ...s, index: s.index + 1 }));
        return;
      }
      setIndex(cursorIndex + 1);
    }

    setactiveKey({
      key: mainString[cursorIndex % strLen]
        ? mainString[cursorIndex % strLen]
        : null,
      shiftKey: isShiftOn(mainString[cursorIndex % strLen]),
    });
    setwrongKey(
      event && event.key === mainString[cursorIndex % strLen] ? null : event
    );
    if (event && !(event.key === mainString[cursorIndex % strLen])) {
      setwrongInputCount((s) => s + 1);
    }
  };

  const handleStrings = () => {
    sethalfFirst(mainString.substring(0, cursorIndex % strLen));
    sethalfSecond(
      mainString.substring(cursorIndex % strLen, mainString.length)
    );
    sethintText(
      grandMainStrng.substring(
        cursorIndex - (cursorIndex % strLen) + strLen,
        cursorIndex - (cursorIndex % strLen) + strLen + 8
      )
    );
    _handleKeyDown(null);
  };

  function diffSeconds(dt2: Date, dt1: Date) {
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
        setSpeed({
          value: 0,
          start: new Date(),
          end: null,
        });
      } else {
        if (speed.end && speed.end.getSeconds() === new Date().getSeconds()) {
          // console.log(true, 'skiped');
          return;
        }

        setSpeed((s) => {
          return {
            ...s,
            end: new Date(),
            speed: (
              grandMainStrng.substring(0, cursorIndex).split(' ').length /
              diffSeconds(new Date(), speed.start)
            ).toFixed(0),
          };
        });
        setAccuracy(
          Number(
            (
              ((cursorIndex - wrongInputCount) / cursorIndex) * 100 || 100
            ).toFixed(0)
          )
        );
      }
    }, 1);
    return () => clearInterval(interval);
  }, [grandMainStrng, cursorIndex, speed, setSpeed]);

  useEffect(() => {
    setmainString(
      grandMainStrng.substring(
        cursorIndex - (cursorIndex % strLen),
        cursorIndex - (cursorIndex % strLen) + strLen
      )
    );
    handleStrings();
  }, [cursorIndex, strLen, mainString, refresh]);

  useEffect(() => {
    setgrandMainStrng(lessonList[lessonInfo.index]);
    setIndex(0);
    setwrongInputCount(0);
    setSpeed({
      value: 0,
      start: new Date(),
      end: null,
    });
    handleStrings();
    setrefresh(!refresh);
  }, [lessonInfo.index]);

  useEffect(() => {
    setSpeed({
      value: 0,
      start: new Date(),
      end: null,
    });
    setIndex(0);
    setwrongInputCount(0);
  }, [language]);

  return (
    <CBody>
      <Header />
      <div
        className={classNames('flex flex-col items-center py-12 gap-6 flex-1', {
          'justify-center relative pb-24': !visibleCards.keyboard,
          'justify-end': visibleCards.keyboard,
        })}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.25 }}
          className={classNames(
            'typing-view relative bottom-16 xl:bottom-12',
            language
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
                myref.current?.focus();
              }}
              autoComplete="off"
              onKeyPress={_handleKeyDown}
            />
          </div>
        </motion.div>

        {visibleCards.keyboard && (
          <div className="flex max-w-screen-xl w-full">
            <Keyboard
              showHand={visibleCards.hands}
              activeKey={activeKey}
              wrongKey={wrongKey}
              className={`${language} day`}
            />
          </div>
        )}
      </div>
    </CBody>
  );
};

export default Lessons;
