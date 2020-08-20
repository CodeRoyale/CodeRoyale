import React from 'react';
import './FrontPageMain.css';
import Description from './Description';
import FrontPageNavBar from '../../components/frontPageNavBar/FrontPageNavBar';
import { Redirect } from 'react-router';

const FrontPageMain = () => {
  const accessToken = localStorage.getItem('access-token');
  if (accessToken != null) {
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
