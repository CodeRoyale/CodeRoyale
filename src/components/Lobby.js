import React, { useState } from 'react';
import StartButton from './StartButton';
import ProfileCard from './ProfileCard';

function Lobby() {
  const username = 'Sawarni Swaroop'; // Change this after getting the name from server...
  const userImageURL =
    'https://he-s3.s3.amazonaws.com/media/avatars/sawarni99/resized/180/photo.jpg'; // Change this after getting the name from server...
  const startAlreadyClicked = false; // Change this after acknowledgement from the API...
  const [startClicked, setStartClicked] = useState(startAlreadyClicked);
  const onClickStart = (clicked) => {
    setStartClicked(clicked);
  };

  let startGame;
  if (!startClicked) {
    startGame = <StartButton onClick={onClickStart} />;
  } else {
    startGame = (
      // TODO: set loading matches as profile-card vs profile-card...
      <div>
        <ProfileCard name={username} imageUrl={userImageURL} />
        <p className='versus-style'>VS</p>
        <ProfileCard name={username} imageUrl={userImageURL} />
      </div>
    );
  }

  return (
    <div className='Lobby'>
      <div className='header'></div>
      <div className='sections'>
        <div className='right-section'></div>
        <div className='left-section'>{startGame}</div>
      </div>
      <div className='footer'></div>
    </div>
  );
}

export default Lobby;
