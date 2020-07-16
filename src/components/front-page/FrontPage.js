import React from 'react';
import Header from './front-page-components/Header';
import Intro from './front-page-components/Intro';
import Footer from './front-page-components/Footer';

function FrontPage() {
  return (
    <div className='front-page'>
      <Header />
      <Intro />
      <Footer />
    </div>
  );
}

export default FrontPage;
