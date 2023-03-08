import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import tailwind from '../../tailwind.config';

const useColor = () => {
  const { theme } = useTheme();
  const [color, setColor] = useState({
    color:
      theme === 'dark'
        ? tailwind.theme.extend.colors.dark.primary[500]
        : tailwind.theme.extend.colors.primary[900],
    background:
      theme === 'dark'
        ? tailwind.theme.extend.colors.dark.background.DEFAULT
        : tailwind.theme.extend.colors.primary[50],
  });

  useEffect(() => {
    setColor({
      color:
        theme === 'dark'
          ? tailwind.theme.extend.colors.dark.primary[500]
          : tailwind.theme.extend.colors.primary[900],
      background:
        theme === 'dark'
          ? tailwind.theme.extend.colors.dark.background.DEFAULT
          : tailwind.theme.extend.colors.primary[50],
    });
  }, [theme]);

  return color;
};

export default useColor;
