import React from 'react';
import './FrontPageMain.css';
import Description from './Description';
import NavBar from '../../components/navBar/NavBar';

const FrontPageMain = () => {
  return (
    <div className='front-page'>
      <NavBar loggedIn={false} />
      <Description />
    </div>
  );
};

export default FrontPageMain;
