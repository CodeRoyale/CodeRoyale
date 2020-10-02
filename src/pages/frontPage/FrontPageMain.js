import React from 'react';
import './FrontPageMain.css';
import Description from './Description';
import FrontPageNavBar from '../../components/frontPageNavBar/FrontPageNavBar';

const FrontPageMain = () => {
  return (
    <div className='front-page'>
      <FrontPageNavBar />
      <Description />
    </div>
  );
};

export default FrontPageMain;
