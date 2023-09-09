import React, { useState, useEffect } from 'react';

const TypingTest = () => {
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [correctWordCount, setCorrectWordCount] = useState(0);
  const [incorrectWordCount, setIncorrectWordCount] = useState(0);
  const [wpm, setWpm] = useState('0');
  const [accuracy, setAccuracy] = useState('0');

  const text = 'Your sample text here';

  useEffect(() => {
    if (input.length === 1 && startTime === null) {
      // Start the timer when the user starts typing
      setStartTime(new Date());
    }

    const wordsTyped = input.trim().split(' ').length;
    setWordCount(wordsTyped);

    const correctWords = input
      .trim()
      .split(' ')
      .filter((word, index) => {
        const words = text.trim().split(' ');
        return words[index] === word;
      }).length;
    setCorrectWordCount(correctWords);
    setIncorrectWordCount(wordsTyped - correctWords);

    // @ts-ignore
    const totalTime = (new Date() - startTime) / 1000 / 60;
    setWpm((wordsTyped / totalTime).toFixed(2));

    setAccuracy(((correctWords / wordsTyped) * 100).toFixed(2));
  }, [input]);

  return (
    <div>
      <p>{text}</p>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <p>Word Count: {wordCount}</p>
      <p>Correct Words: {correctWordCount}</p>
      <p>Incorrect Words: {incorrectWordCount}</p>
      <p>WPM: {wpm}</p>
      <p>Accuracy: {accuracy}%</p>
    </div>
  );
};

export default TypingTest;
