import React, { useState } from 'react';
import './FrontPageMain.css';
import Description from './Description';
import FrontPageNavBar from '../../components/frontPageNavBar/FrontPageNavBar';
import { Redirect } from 'react-router';

const FrontPageMain = () => {
  const accessToken = localStorage.getItem('access-token');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (accessToken != null) {
    setIsLoggedIn(true);
  }

  if (isLoggedIn) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='front-page'>
      <FrontPageNavBar />
      <Description />
    </div>
  );
};

export default FrontPageMain;
