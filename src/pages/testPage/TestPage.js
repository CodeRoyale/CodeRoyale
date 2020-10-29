import React from 'react';
import Timer from '../../components/timer/Timer';
import VetoTopBar from '../../pages/vetoPage/VetoTopBar';
import './TestPage.css';

const TestPage = () => {
  // document.body.style = 'background: gray;';
  return (
    <div className='test-page'>
      <VetoTopBar />
    </div>
  );
};

export default TestPage;
