import React from 'react';
import ScoreboardPlayer from './ScoreboardPlayer';
import './ScoreboardMain.css';

const ScoreboardTeam = ({ rank, teamName, team, userImages }) => {
  let containerStyle;
  let medalImg;
  let playerCards = null;

  // Styling based on rank
  if (rank === 'gold') {
    containerStyle = {
      'background-color': '#FFBA57',
    };
    medalImg = '/images/gold_medal.svg';
  } else if (rank === 'silver') {
    containerStyle = {
      'background-color': '#9D9D9D',
      margin: '70px 25px 0px 0px',
    };
    medalImg = '/images/silver_medal.svg';
  } else if (rank === 'bronze') {
    containerStyle = {
      'background-color': '#CD7430',
      margin: '100px 0px 0px 25px',
    };
    medalImg = '/images/bronze_medal.svg';
  }

  if (team !== undefined) {
    playerCards = team.map((player, index) => {
      return (
        <ScoreboardPlayer
          key={index}
          userImage='https://www.flaticon.com/svg/static/icons/svg/21/21104.svg'
          userName={player}
        />
      );
    });
  }

  return (
    <div style={containerStyle} className='scoreboard-team-container'>
      <img className='scoreboard-medal' alt='gold medal' src={medalImg} />
      <div className='scoreboard-team-details'>
        <h4 className='scoreboard-team-name'>{`${teamName}`}</h4>
        <div className='scoreboard-team-player-cards'>{playerCards}</div>
      </div>
    </div>
  );
};

export default ScoreboardTeam;
