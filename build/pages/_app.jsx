import { RecoilRoot } from 'recoil';
import '../styles/globals.scss';
import { ThemeProvider } from 'next-themes';
import { SafeHydrate } from '@commons/helpers/ssr-utils';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { firebaseInit } from '@commons/firebase';
import Footer from '@components/atoms/footer';
import CBody from '@components/atoms/cbody';

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  const handleRouteChange = (url) => {
    // @ts-ignore
    if (window && window.gtag) {
      // @ts-ignore
      window.gtag('config', 'G-QW6470DZ7Z', {
        page_path: url,
      });
    }
  };

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    // @ts-ignore
    <ThemeProvider attribute="class">
      <ToastContainer />
      <Head>
        <title>Typing Guru</title>
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="A complete platform to learn typings and to practice your typing skills. Learn to type faster, get better at typing guru, and improve your typing skills."
        />

        <link rel="icon" href="/DialogIcon.png" />
        <link rel="apple-touch-icon" href="/DialogIcon.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      {/* @ts-ignore */}
      <RecoilRoot>
        <div className="hidden md:block">
          {/* <Component {...pageProps} /> */}
          {!Component.SSR && (
            <SafeHydrate>
              <Component {...pageProps} />
            </SafeHydrate>
          )}
          {Component.SSR && <Component {...pageProps} />}
        </div>
        <div className="md:hidden">
          <CBody className="flex justify-center items-center min-h-screen">
            <div className="max-w-xs tracking-wide text-lg leading-relaxed">
              Please open in your desktop device or rotate your phone.
              <br />
              <br />
              Use external keyboard if you want to practice in your phone.
            </div>
          </CBody>
        </div>
        <Footer />
      </RecoilRoot>
    </ThemeProvider>
  );
};

export default MyApp;
