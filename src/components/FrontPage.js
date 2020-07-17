import React from 'react';
import Header from './Header';
import Intro from './Intro';
import Footer from './Footer';

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
