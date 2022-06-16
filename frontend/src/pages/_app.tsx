import React from 'react';
import type { AppProps } from 'next/app';
import ReactModal from 'react-modal';
import NProgress from 'nprogress';
import Router from 'next/router';
import { WebSocketProvider } from '../modules/ws/WebSocketProvider';
import 'nprogress/nprogress.css';
import '../styles/globals.css';

ReactModal.setAppElement('#__next');

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const pagesThatNeedWs = 'DashboardPage';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <WebSocketProvider
      shouldConnect={Component.displayName?.includes(pagesThatNeedWs)!}
    >
      <Component {...pageProps} />
    </WebSocketProvider>
  );
};

export default MyApp;
