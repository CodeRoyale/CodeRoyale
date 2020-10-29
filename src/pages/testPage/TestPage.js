import React from 'react';
import Timer from '../../components/timer/Timer';
import VetoStatus from '../../pages/vetoPage/VetoStatus';
import './TestPage.css';

const TestPage = () => {
  // document.body.style = 'background: gray;';
  return (
    <div className='test-page'>
      <VetoStatus />
    </div>
  );
};

export default TestPage;
