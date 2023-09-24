import CBody from '@src/components/container-body';
import ConfigProvider from '@src/hooks/use-config';
import { SafeHydrate } from 'commons/helpers/ssr-utils';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';

const MyApp = ({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: any;
}) => {
  return (
    <ConfigProvider>
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
        <CBody className="flex justify-center items-center min-h-screen text-primary bg-background">
          <div className="max-w-xs tracking-wide text-lg leading-relaxed">
            Please open in your desktop device or rotate your phone.
            <br />
            <br />
            Use external keyboard if you want to practice in your phone.
          </div>
        </CBody>
      </div>
    </ConfigProvider>
  );
};

export default MyApp;
