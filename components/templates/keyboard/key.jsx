import React, { useMemo } from 'react';
import classNames from 'classnames';

const Key = ({
  className,
  activeKey,
  keyMatch,
  wrongKey,
  keys,
  keyMatchFun = (_) => {
    return false;
  },
}) =>
  useMemo(() => {
    return (
      <div
        className={classNames(className, {
          active:
            activeKey &&
            keyMatch &&
            (activeKey.key === keyMatch[0] ||
              activeKey.key === keyMatch[1] ||
              keyMatchFun(activeKey)),
          'wrong-key':
            wrongKey &&
            keyMatch &&
            (activeKey.key === keyMatch[0] ||
              activeKey.key === keyMatch[1] ||
              keyMatchFun(activeKey)),
        })}
      >
        {keys}
      </div>
    );
  }, [activeKey, wrongKey]);

export default Key;
