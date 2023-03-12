import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';

const Cursor = ({ left = false, done = false }) => {
  return (
    <motion.div
      layoutId="cursor"
      transition={{ duration: 0.11, ease: 'linear' }}
      className={classNames('bg-yellow-500 w-0.5 flex absolute h-full top-0', {
        'right-0': !left,
        'left-0': left,
        hidden: done,
      })}
    />
  );
};

const Word = ({ word, inputText, done }) => {
  return useMemo(() => {
    return (
      <div
        className={classNames('', {
          relative: inputText != null && inputText.length === 0,
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
                'text-green-600':
                  inputText != null && inputText[i] && inputText[i] === char,

                'text-red-900 opacity-40':
                  done && inputText != null && inputText[i] === undefined,
                'text-red-900': wrong,
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
          <span className="text-red-900 relative opacity-80">
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
  }, [word, inputText, done]);
};

const Race = () => {
  const strArr =
    'Kubernetes is an open-source container orchestration system for automating software deployment, scaling, and management. Originally designed by Google, the project is now maintained by the Cloud Native Computing Foundation. The name Kubernetes originates from Greek'.split(
      ' '
    );
  const [usrArr, setUserArr] = useState([]);

  const [inputText, setInputText] = useState('');
  const [lastWrong, setLastWrong] = useState(false);
  const handleInput = (e) => {
    const char = e.nativeEvent.key;
    // console.log(char);
    if (char === ' ') {
      setLastWrong(strArr[usrArr.length] !== inputText);
      setInputText((s) => {
        setUserArr((s2) => [...s2, s]);
        return '';
      });
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

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="border p-6 rounded-md flex flex-col gap-6 relative">
        <input
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          data-gramm="false"
          data-gramm_editor="false"
          data-enable-grammarly="false"
          list="autocompleteOff"
          className="absolute bottom-0 left-0 right-0 -z-10 opacity-0"
          value={inputText}
          onKeyDown={handleInput}
          onChange={() => {}}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          onBlur={(e) => e?.target?.focus()}
        />
        <div className="flex gap-2 flex-wrap max-w-4xl font-roboto_mono text-gray-500 tracking-wide">
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
  );
};

export default Race;
