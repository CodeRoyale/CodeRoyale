import React from 'react';
import type { AppProps } from 'next/app';
import ReactModal from 'react-modal';
import '../styles/globals.css';

ReactModal.setAppElement('#__next');

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default MyApp;
