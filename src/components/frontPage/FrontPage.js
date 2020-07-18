import React from 'react';
import Header from '../../components/header/Header';
import Intro from '../../components/intro/Intro';
import Footer from '../../components/footer/Footer';
import './FrontPage.css';

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
