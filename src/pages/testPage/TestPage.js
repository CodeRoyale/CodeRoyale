import React from 'react';
import TeamCard from '../../components/teamCard/TeamCard';
// import ScoreboardTeam from '../../pages/scoreboardPage/ScoreboardTeam';
import './TestPage.css';
// import ScoreboardPlayer from '../scoreboardPage/ScoreboardPlayer';

const TestPage = () => {
  // document.body.style = 'background: gray;';
  return (
    <div className='test-page'>
      {/* <ScoreboardPlayer
        userImage='https://bit.ly/sage-adebayo'
        userName='joelmathew'
      /> */}
      {/* <ScoreboardTeam
        rank='gold'
        userImages={{ joelmathewkoshy: 'https://bit.ly/sage-adebayo' }}
        teamName={'asd'}
        team={['joelmathewkoshy']}
      /> */}
      <TeamCard />
    </div>
  );
};

export default TestPage;
