import Header from '@components/molecules/header';
import axios from 'axios';
import { useEffect, useState } from 'react';

const MainLayout = ({ children }) => {
  const [views, setviews] = useState(0);

  const increasePageView = () => {
    axios({
      url: 'https://api.anayak.com.np/vcnt/?ID=typingguru_site',
      method: 'get',
    })
      .then((res) => setviews(res.data.message))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    // increasePageView();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="hidden">
        <p>Please open in desktop/laptop device to start typing...</p>
      </div>
      {views ? (
        <span className="fixed right-1 bottom-1">page views: {views}</span>
      ) : (
        ''
      )}
      <span className="fixed left-1 bottom-1 font-bold text-gray-500">
        &copy; {new Date().getFullYear()}{' '}
        <a
          className="text-gray-800 hover:text-primary-900"
          href="https://progman.in/dashboard"
        >
          Progman
        </a>
      </span>

      <Header />
      {children}
    </div>
  );
};

export default MainLayout;
