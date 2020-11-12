import React from 'react';

const ScoreboardPlayer = ({ userImage, userName }) => {
  return (
    <div className='scoreboard-player'>
      <img
        className='scoreboard-player-profile-pic'
        alt='profile img'
        src={userImage}
      />
      <div className='scoreboard-player-username'>{userName}</div>
    </div>
  );
};

export default ScoreboardPlayer;
