import React, { useEffect, useState } from 'react';
import Key from './key';
import Hand from './hand';

function Keyboard({
  activeKey: aKey,
  wrongKey: wKey = null,
  className,
  showHand,
}) {
  const [activeKey, setactiveKey] = useState(null);

  const [wrongKey, setwrongKey] = useState(null);
  useEffect(() => {
    setactiveKey(aKey);
    setwrongKey(wKey);
  }, [aKey, wKey]);

  const keylist = [
    {
      id: '1',
      keys: <>Esc</>,
      className: 'key function space1',
      keyMatch: ['Escape'],
    },
    {
      id: '2',
      keys: <>F1</>,
      className: 'key function',
      keyMatch: ['F1'],
    },
    {
      id: '3',
      keys: <>F2</>,
      className: 'key function',
      keyMatch: ['F2'],
    },
    {
      id: '4',
      keys: <>F3</>,
      className: 'key function',
      keyMatch: ['F3'],
    },
    {
      id: '5',
      keys: <>F4</>,
      className: 'key function space2',
      keyMatch: ['F4'],
    },
    {
      id: '6',
      keys: <>F5</>,
      className: 'key function',
      keyMatch: ['F5'],
    },
    {
      id: '7',
      keys: <>F6</>,
      className: 'key function',
      keyMatch: ['F6'],
    },
    {
      id: '8',
      keys: <>F7</>,
      className: 'key function',
      keyMatch: ['F7'],
    },
    {
      id: '9',
      keys: <>F8</>,
      className: 'key function space2',
      keyMatch: ['F8'],
    },
    {
      id: '10',
      keys: <>F9</>,
      className: 'key function',
      keyMatch: ['F9'],
    },
    {
      id: '11',
      keys: <>F10</>,
      className: 'key function',
      keyMatch: ['F10'],
    },
    {
      id: '12',
      keys: <>F11</>,
      className: 'key function',
      keyMatch: ['F11'],
    },
    {
      id: '13',
      keys: <>F12</>,
      className: 'key function',
      keyMatch: ['F12'],
    },

    {
      id: '14',
      keys: (
        <>
          ~<br />
          &nbsp;&nbsp;&nbsp;`
        </>
      ),
      className: 'key num dual',
      keyMatch: ['~', '`'],
    },
    {
      id: '15',
      keys: (
        <>
          !<br />
          &nbsp;&nbsp;&nbsp;1
        </>
      ),
      className: 'key num dual',
      keyMatch: ['!', '1'],
    },
    {
      id: '16',
      keys: (
        <>
          @<br />
          &nbsp;&nbsp;&nbsp;2
        </>
      ),
      className: 'key num dual',
      keyMatch: ['@', '2'],
    },
    {
      id: '17',
      keys: (
        <>
          #<br />
          &nbsp;&nbsp;&nbsp;3
        </>
      ),
      className: 'key num dual',
      keyMatch: ['#', '3'],
    },
    {
      id: '18',
      keys: (
        <>
          $<br />
          &nbsp;&nbsp;&nbsp;4
        </>
      ),
      className: 'key num dual',
      keyMatch: ['$', '4'],
    },
    {
      id: '19',
      keys: (
        <>
          %<br />
          &nbsp;&nbsp;&nbsp;5
        </>
      ),
      className: 'key num dual',
      keyMatch: ['%', '5'],
    },
    {
      id: '20',
      keys: (
        <>
          ^<br />
          &nbsp;&nbsp;&nbsp;6
        </>
      ),
      className: 'key num dual',
      keyMatch: ['^', '6'],
    },
    {
      id: '21',
      keys: (
        <>
          &amp;
          <br />
          &nbsp;&nbsp;&nbsp;7
        </>
      ),
      className: 'key num dual',
      keyMatch: ['&', '7'],
    },
    {
      id: '22',
      keys: (
        <>
          *<br />
          &nbsp;&nbsp;&nbsp;8
        </>
      ),
      className: 'key num dual',
      keyMatch: ['*', '8'],
    },
    {
      id: '23',
      keys: (
        <>
          &#40;
          <br />
          &nbsp;&nbsp;&nbsp;9
        </>
      ),
      className: 'key num dual',
      keyMatch: ['(', '9'],
    },
    {
      id: '24',
      keys: (
        <>
          &#41;
          <br />
          &nbsp;&nbsp;&nbsp;0
        </>
      ),
      className: 'key num dual',
      keyMatch: [')', 0],
    },
    {
      id: '25',
      keys: (
        <>
          _<br />
          &nbsp;&nbsp;&nbsp;-
        </>
      ),
      className: 'key num dual',
      keyMatch: ['_', '-'],
    },

    {
      id: '26',
      keys: (
        <>
          +<br />
          &nbsp;&nbsp;&nbsp;=
        </>
      ),
      className: 'key num dual',
      keyMatch: ['+', '='],
    },
    {
      id: '27',
      keys: <>Backspace </>,
      className: 'key backspace',
      keyMatch: ['Backspace'],
    },
    {
      id: '28',
      keys: <>Tab </>,
      className: 'key tab',
      keyMatch: ['Tab'],
    },
    {
      id: '29',
      keys: (
        <>
          Q <br />
          &nbsp;&nbsp;&nbsp;q
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['Q', 'q'],
    },
    {
      id: '30',
      keys: (
        <>
          W <br />
          &nbsp;&nbsp;&nbsp;w
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['W', 'w'],
    },
    {
      id: '31',
      keys: (
        <>
          E <br />
          &nbsp;&nbsp;&nbsp;e
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['E', 'e'],
    },
    {
      id: '32',
      keys: (
        <>
          R <br />
          &nbsp;&nbsp;&nbsp;r
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['R', 'r'],
    },
    {
      id: '33',
      keys: (
        <>
          T <br />
          &nbsp;&nbsp;&nbsp;t
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['T', 't'],
    },
    {
      id: '34',
      keys: (
        <>
          Y <br />
          &nbsp;&nbsp;&nbsp;y
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['Y', 'y'],
    },
    {
      id: '35',
      keys: (
        <>
          U <br />
          &nbsp;&nbsp;&nbsp;u
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['U', 'u'],
    },
    {
      id: '36',
      keys: (
        <>
          I <br />
          &nbsp;&nbsp;&nbsp;i
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['I', 'i'],
    },
    {
      id: '37',
      keys: (
        <>
          O <br />
          &nbsp;&nbsp;&nbsp;o
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['O', 'o'],
    },
    {
      id: '38',
      keys: (
        <>
          P <br />
          &nbsp;&nbsp;&nbsp;p
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['P', 'p'],
    },

    {
      id: '39',
      keys: (
        <>
          &#123; <br />
          &nbsp;&nbsp;&nbsp;[
        </>
      ),
      className: 'key dual',
      keyMatch: ['[', '{'],
    },

    {
      id: '40',
      keys: (
        <>
          &#125; <br />
          &nbsp;&nbsp;&nbsp;]
        </>
      ),
      className: 'key dual',
      keyMatch: ['}', ']'],
    },

    {
      id: '41',
      keys: (
        <>
          |<br />
          &nbsp;&nbsp;&nbsp;\
        </>
      ),
      className: 'key letter dual slash',
      keyMatch: ['\\', '|'],
    },
    {
      id: '42',
      keys: (
        <>
          Caps
          <br />
          Lock
        </>
      ),
      className: 'key caps',
      keyMatch: ['CapsLock'],
    },
    {
      id: '43',
      keys: (
        <>
          A <br />
          &nbsp;&nbsp;&nbsp;a
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['a', 'A'],
    },
    {
      id: '44',
      keys: (
        <>
          S <br />
          &nbsp;&nbsp;&nbsp;s
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['s', 'S'],
    },
    {
      id: '45',
      keys: (
        <>
          D <br />
          &nbsp;&nbsp;&nbsp;d
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['d', 'D'],
    },
    {
      id: '46',
      keys: (
        <>
          F <br />
          &nbsp;&nbsp;&nbsp;f
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['F', 'f'],
    },
    {
      id: '47',
      keys: (
        <>
          G <br />
          &nbsp;&nbsp;&nbsp;g
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['G', 'g'],
    },
    {
      id: '48',
      keys: (
        <>
          H <br />
          &nbsp;&nbsp;&nbsp;h
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['H', 'h'],
    },
    {
      id: '49',
      keys: (
        <>
          J <br />
          &nbsp;&nbsp;&nbsp;j
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['j', 'J'],
    },
    {
      id: '50',
      keys: (
        <>
          K <br />
          &nbsp;&nbsp;&nbsp;k
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['k', 'K'],
    },
    {
      id: '51',
      keys: (
        <>
          L <br />
          &nbsp;&nbsp;&nbsp;l
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['L', 'l'],
    },
    {
      id: '52',
      keys: (
        <>
          :<br />
          &nbsp;&nbsp;&nbsp;;
        </>
      ),
      className: 'key dual',
      keyMatch: [':', ';'],
    },
    {
      id: '53',
      keys: (
        <>
          &quot;
          <br />
          &nbsp;&nbsp;&nbsp;&apos;
        </>
      ),
      className: 'key dual',
      keyMatch: ['"', "'"],
    },

    {
      id: '54',
      keys: <>Enter</>,
      className: 'key enter',
      keyMatch: ['Enter'],
    },

    {
      id: '55',
      keys: <>Shift</>,
      className: 'key shift left',
      keyMatch: ['Shift'],
      keyMatchFun: (acKey) => {
        return acKey?.shiftKey;
      },
    },
    {
      id: '56',
      keys: (
        <>
          Z <br />
          &nbsp;&nbsp;&nbsp;z
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['z', 'Z'],
    },
    {
      id: '57',
      keys: (
        <>
          X <br />
          &nbsp;&nbsp;&nbsp;x
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['X', 'x'],
    },
    {
      id: '58',
      keys: (
        <>
          C <br />
          &nbsp;&nbsp;&nbsp;c
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['C', 'c'],
    },
    {
      id: '59',
      keys: (
        <>
          V <br />
          &nbsp;&nbsp;&nbsp;v
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['V', 'v'],
    },
    {
      id: '60',
      keys: (
        <>
          B <br />
          &nbsp;&nbsp;&nbsp;b
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['b', 'B'],
    },
    {
      id: '61',
      keys: (
        <>
          N <br />
          &nbsp;&nbsp;&nbsp;n
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['n', 'N'],
    },
    {
      id: '62',
      keys: (
        <>
          M <br />
          &nbsp;&nbsp;&nbsp;m
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['M', 'm'],
    },
    {
      id: '63',
      keys: (
        <>
          &lt;
          <br />
          &nbsp;&nbsp;&nbsp;,
        </>
      ),
      className: 'key dual',
      keyMatch: [',', '<'],
    },
    {
      id: '64',
      keys: (
        <>
          &gt; <br />
          &nbsp;&nbsp;&nbsp; .
        </>
      ),
      className: 'key dual',
      keyMatch: ['.', '>'],
    },
    {
      id: '65',
      keys: (
        <>
          ? <br />
          &nbsp;&nbsp;&nbsp;/
        </>
      ),
      className: 'key dual',
      keyMatch: ['?', '/'],
    },

    {
      id: '66',
      keys: <>Shift</>,
      className: 'key shift right',
      keyMatch: ['Shift'],
      keyMatchFun: (acKey) => {
        return acKey?.shiftKey;
      },
    },
    {
      id: '67',
      keys: <>Ctrl</>,
      className: 'key ctrl',
      keyMatch: ['Control'],
      keyMatchFun: (acKey) => {
        return acKey?.ctrlKey;
      },
    },
    {
      id: '68',
      keys: <>Win</>,
      className: 'key',
    },
    {
      id: '69',
      keys: <>Alt</>,
      className: 'key',
      keyMatch: ['Alt'],
      keyMatchFun: (acKey) => {
        return acKey?.altKey;
      },
    },
    {
      id: '70',
      keys: <></>,
      className: 'key space',
      keyMatch: [' '],
    },
    {
      id: '71',
      keys: <>Alt</>,
      className: 'key',
      keyMatch: ['Alt'],
      keyMatchFun: (acKey) => {
        return acKey?.altKey;
      },
    },
    {
      id: '72',
      keys: <>Win</>,
      className: 'key',
    },
    {
      id: '73',
      keys: <>Fn</>,
      className: 'key',
    },

    {
      id: '74',
      keys: <>Ctrl</>,
      className: 'key ctrl',
      keyMatch: ['Control'],
      keyMatchFun: (acKey) => {
        return acKey?.ctrlKey;
      },
    },
  ];

  return (
    <section className="flex items-baseline w-full justify-center relative bottom-16">
      {showHand && <Hand activeKey={activeKey} wrongKey={wrongKey} leftHand />}
      <div>
        <div className={`keyboard ${className}`}>
          <div className="section-a">
            {/* <!--END FUNCTION KEYS --> */}

            {keylist.map((item) => {
              return (
                <Key
                  key={`${item.id}-key`}
                  activeKey={activeKey}
                  wrongKey={wrongKey}
                  keys={item.keys}
                  className={item.className}
                  keyMatch={item.keyMatch}
                  keyMatchFun={item.keyMatchFun}
                />
              );
            })}
          </div>
        </div>
        {/* // <!-- end section-a--> */}
      </div>
      {/* //   <!-- end sec-func --> */}

      {showHand && <Hand activeKey={activeKey} wrongKey={wrongKey} rightHand />}
    </section>
  );
}

export default Keyboard;
