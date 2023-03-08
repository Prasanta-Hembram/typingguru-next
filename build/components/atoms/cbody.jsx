import useColor from '@commons/helpers/use-color';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

const CBody = ({ children, ...props }) => {
  const { color, background } = useColor();
  const [bg, setBg] = useState('');
  const [txt, setTxt] = useState('');
  useEffect(() => {
    setBg(background);
    setTxt(color);
  }, [background, color]);
  return (
    <div
      style={{
        color: txt,
        background: bg,
      }}
      className={classNames('flex flex-col min-h-screen min-w-[1080px]')}
      {...props}
    >
      {children}
    </div>
  );
};

export default CBody;
