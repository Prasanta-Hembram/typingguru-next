import { configsContext } from '@commons/context/recoil-context';
import { usePersistentRecoilState } from '@components/hooks/use-recoil-presist';
import axios from 'axios';
import { useTheme } from 'next-themes';
import { doc } from 'prettier';
import { useEffect, useState } from 'react';

const Footer = () => {
  const [views, setviews] = useState(0);

  const counterUrl =
    'https://counter10.p.rapidapi.com/?rapidapi-key=44fcc7f8f7mshacfcb91fc4190bfp189dddjsnaa696e83052d&&';

  const increasePageView = () => {
    const v = sessionStorage.getItem('views');
    if (v) {
      setviews(parseInt(v, 10));
      return;
    }

    axios({
      url: `${counterUrl}ID=typingguru_site`,
      method: 'get',
    })
      .then((res) => {
        sessionStorage.setItem('views', res.data.message);
        setviews(res.data.message);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    axios({
      url: `${counterUrl}ID=typingguru_site_views`,
      method: 'get',
    })
      .then((res) => {
        console.log(res.data.message);
      })
      .catch((err) => console.error(err));
  }, []);

  const isDev = process.env.NODE_ENV === 'development';

  useEffect(isDev ? () => {} : increasePageView, []);

  const [configs] = usePersistentRecoilState(configsContext);

  const setTheme = (thm) => {
    if (document?.getElementsByTagName('html')[0]?.className) {
      document.getElementsByTagName('html')[0].className = thm;
    }
  };

  useEffect(() => {
    if (!configs.colorScheme) {
      setTheme('light-plain');
    } else {
      setTheme(configs.colorScheme);
    }
  }, [configs.colorScheme]);

  return (
    <footer className="flex justify-center w-full fixed bottom-0 font-ropa_sans text-md p-3 text-primary">
      <div className="max-w-screen-xl w-full flex justify-between">
        <div className="flex gap-1">
          &copy; {new Date().getFullYear()}{' '}
          <a href="https://typing-guru.com" className="flex">
            Typing Guru
          </a>
        </div>
        {views !== 0 && <div>Total Visits: {views}</div>}
      </div>
    </footer>
  );
};

export default Footer;
