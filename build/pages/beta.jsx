import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import CBody from '@components/atoms/cbody';
import axios from 'axios';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import BounceIt from '@components/atoms/bounce-it';
import Container from '@components/atoms/container';

function getRandomInt(min, max) {
  // eslint-disable-next-line no-param-reassign
  min = Math.ceil(min);
  // eslint-disable-next-line no-param-reassign
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

const Beta = () => {
  // Handle focus of the keyboard

  return (
    <CBody>
      <div className="flex-1 flex flex-col items-center justify-center relative text-lg">
        <div className="absolute left-0 top-0 w-full">
          <Container>
            <Link href="/">
              <BounceIt className="p-4 flex gap-2 items-center cursor-pointer">
                <FiArrowLeft />
                <span>Home</span>
              </BounceIt>
            </Link>
          </Container>
        </div>

        <Race />
      </div>
    </CBody>
  );
};

const Cursor = ({ left = false, done = false }) => {
  return (
    <motion.div
      layoutId="cursor"
      transition={{ duration: 0.11, ease: 'linear' }}
      className={classNames('bg-yellow-700 w-0.5 flex absolute h-full top-0', {
        'right-0': !left,
        'left-0': left,
        hidden: done,
      })}
    />
  );
};

const Word = ({ word, inputText, done }) => {
  const [isWrong, setWrong] = useState(false);
  useEffect(() => {
    if (done && inputText !== word) {
      setWrong(true);
    } else {
      setWrong(false);
    }
  }, [done, inputText, done]);
  return useMemo(() => {
    return (
      <div
        className={classNames('', {
          relative: inputText != null && inputText.length === 0,
          'underline decoration-[#ca4754]': isWrong,
        })}
      >
        {word.split('').map((char, i) => {
          const k = char + i;
          const wrong =
            inputText != null && inputText[i] && inputText[i] !== char;
          return (
            <span
              key={k}
              className={classNames({
                'text-[#d1d0c5]':
                  inputText != null && inputText[i] && inputText[i] === char,

                'text-[#646669]':
                  done && inputText != null && inputText[i] === undefined,
                'text-[#ca4754]': wrong,
                relative: inputText != null && inputText.length - 1 === i,
              })}
            >
              {char}
              {inputText != null && inputText.length - 1 === i && (
                <Cursor done={done} />
              )}
            </span>
          );
        })}
        {word.length < inputText?.length && (
          <span className="text-[#7e2a33] relative opacity-80">
            {inputText
              .substring(
                word.length,
                inputText.length - word.length <= 5
                  ? inputText.length
                  : word.length + 5
              )
              .split('')
              .map((char, i) => {
                const k = char + i;
                return <span key={k}>{char}</span>;
              })}
            <Cursor done={done} />
          </span>
        )}
        {inputText != null && inputText.length === 0 && (
          <Cursor left done={done} />
        )}
      </div>
    );
  }, [word, inputText, done, isWrong]);
};

const Race = () => {
  const [strArr, setStrArr] = useState(''.split(''));
  const [usrArr, setUserArr] = useState([]);

  const [inputText, setInputText] = useState('');
  const [lastWrong, setLastWrong] = useState(false);
  const handleInput = (e) => {
    const char = e.nativeEvent.key;
    // console.log(char);
    if (char === ' ') {
      if (inputText?.length > 0) {
        setLastWrong(strArr[usrArr.length] !== inputText);
        setInputText((s) => {
          setUserArr((s2) => [...s2, s]);
          return '';
        });
      }
    } else if (char.length === 1) {
      setInputText((s) => s + char);
    } else if (char === 'Backspace') {
      setInputText((s) => {
        if (s?.length === 0) {
          if (lastWrong && usrArr.length > 0) {
            setUserArr((u) => u.slice(0, u.length - 1));
            setLastWrong(false);
            return usrArr[usrArr.length - 1];
          }
          return '';
        }
        return s.substring(0, s.length - 1) || '';
      });
    }
  };

  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const resp = await axios({
          url: 'https://type.fit/api/quotes',
        });
        // console.log(resp.data);
        setQuotes(resp.data);
        setStrArr(
          resp.data[getRandomInt(0, resp.data.length)]?.text?.split(' ') || ''
        );
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    if (usrArr.length > 0 && usrArr.length === strArr.length) {
      setUserArr([]);
      setStrArr(
        // @ts-ignore
        quotes[getRandomInt(0, quotes.length)]?.text?.split(' ') || ''
      );
    }
  }, [usrArr]);

  return (
    <div>
      <Container>
        <div className="flex justify-center items-center h-full">
          <div className="border border-slate-600 shadow-md p-6 rounded-md flex flex-col gap-6 relative w-full bg-[#2c2e31]">
            {strArr.length === 0 && <div>Loading....</div>}
            <input
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              data-gramm="false"
              data-gramm_editor="false"
              data-enable-grammarly="false"
              list="autocompleteOff"
              className="absolute bottom-0 left-0 right-0 -z-10 opacity-0"
              inputMode="none"
              value={inputText}
              onKeyDown={handleInput}
              onChange={() => {}}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              onBlur={(e) => e?.target?.focus()}
            />
            <div className="flex gap-2 flex-wrap max-w-[80vw] font-roboto_mono text-[#646669] tracking-wider text-xl">
              {strArr.map((word, i) => {
                const k = word + i;
                return (
                  <Word
                    key={k}
                    word={word}
                    inputText={usrArr.length === i ? inputText : usrArr[i]}
                    done={usrArr[i]}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Beta;
