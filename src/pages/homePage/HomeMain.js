import React from 'react';
import HomeBody from './HomeBody';
import NavBar from '../../components/navBar/NavBar';
import './HomeMain.css';

const HomeMain = () => {
  return (
    <div className='home-page'>
      <NavBar loggedIn={false} />
      <HomeBody />
    </div>
  );
};

export default HomeMain;
