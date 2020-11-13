import React from 'react';
import ScoreboardTeam from '../../pages/scoreboard/ScoreboardTeam';
import jwt from 'jsonwebtoken';
import './TestPage.css';

const TestPage = () => {
  // document.body.style = 'background: gray;';
  console.log(jwt.decode(process.env.REACT_FALLBACK_TOKEN));
  return (
    <div className='test-page'>
      <ScoreboardTeam />
    </div>
  );
};

export default TestPage;
