import React from 'react';
import { Popover, Whisper } from 'rsuite';
import './VetoPlayerStatusCard.css';

const VetoPlayerStatusCard = ({ profilePic, userName, userVoted }) => {
  const speaker = (
    <Popover>{userVoted ? <p>Voted!</p> : <p>Not Yet!</p>}</Popover>
  );

  const vetoStatusColor = userVoted
    ? { 'background-color': 'green' }
    : { 'background-color': 'red' };

  return (
    <div className='veto-player-status-card'>
      <img
        className='veto-player-status-card-player-profile-pic'
        alt='profile img'
        src='https://lh3.googleusercontent.com/a-/AOh14GgwJrwDUSd1-NB4BdMN4XLPj4b-80WgMpKxLuba2w=s96-c'
      />
      <div className='veto-player-status-card-player-name'>{userName}</div>
      <Whisper placement='top' trigger='hover' speaker={speaker}>
        <div className='veto-player-status' style={vetoStatusColor}></div>
      </Whisper>
    </div>
  );
};

export default VetoPlayerStatusCard;
