import React from 'react';
import './FrontPageMain.css';
import Description from './Description';
import FrontPageNavBar from '../../components/frontPageNavBar/FrontPageNavBar';
import { Redirect } from 'react-router';

const FrontPageMain = () => {
  const accessToken = () => {
    let ac = localStorage.getItem('access-token');
    if (ac === null) {
      return false;
    } else {
      return true;
    }
  };

  const isLoggedIn = accessToken ? true : false;

  let content = (
    <div className='front-page'>
      <FrontPageNavBar />
      <Description />
    </div>
  );

  if (!isLoggedIn) {
    content = <Redirect to='/dashboard' />;
  }

  return content;
};

export default FrontPageMain;
