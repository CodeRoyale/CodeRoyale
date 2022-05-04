import React from 'react';
import ReactModal from 'react-modal';
import '../styles/globals.css';

ReactModal.setAppElement('#__next');

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />;

export default MyApp;
