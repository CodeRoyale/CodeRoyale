import React from 'react';
import { Popover, Whisper } from 'rsuite';
import './VetoPlayerStatusCard.css';

const VetoPlayerStatusCard = ({ userImage, userName, team, userVoted }) => {
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
        src={userImage}
      />
      <div>
        <div className='veto-player-status-card-user-name'>{userName}</div>
        <div className='veto-player-status-card-team-name'>{team}</div>
      </div>
      <Whisper placement='top' trigger='hover' speaker={speaker}>
        <div className='veto-player-status' style={vetoStatusColor}></div>
      </Whisper>
    </div>
  );
};

export default VetoPlayerStatusCard;
