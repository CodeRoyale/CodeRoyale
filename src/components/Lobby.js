import React, { useState } from 'react';
import StartButton from './StartButton';
import ProfileCard from './ProfileCard';
import SharableLink from './SharableLink';
import TextHeading from './TextHeading';

function Lobby() {
  const username = 'Sawarni Swaroop'; // Change this after getting the name from server...
  const userImageURL =
    'https://he-s3.s3.amazonaws.com/media/avatars/sawarni99/resized/180/photo.jpg'; // Change this after getting the name from server...
  const startAlreadyClicked = false; // Change this after acknowledgement from the API...
  const matchLink = 'This link will be generated when user clicks START';
  const [startClicked, setStartClicked] = useState(startAlreadyClicked);
  const onClickStart = (clicked) => {
    setStartClicked(clicked);
  };

  let startGame;
  if (!startClicked) {
    startGame = <StartButton onClick={onClickStart} />;
  } else {
    startGame = (
      <div>
        <ProfileCard name={username} imageUrl={userImageURL} />
        <SharableLink matchLink={matchLink} />
      </div>
    );
  }

  return (
    <div className='Lobby'>
      <div className='section'>
        <div className='header'>
          <TextHeading />
        </div>
        <div className='left-section'>{startGame}</div>
      </div>
      <div className='right-section'></div>
      {/*<div className='footer'></div>*/}
    </div>
  );
}

export default Lobby;
