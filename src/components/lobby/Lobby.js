import React, { useState } from 'react';
import StartButton from '../../components/startButton/StartButton';
import ProfileCard from '../../components/profileCard/ProfileCard';
import SharableLink from '../../components/shareableLink/ShareableLink';
import TextHeading from '../../components/textHeading/TextHeading';
import ProfileButton from '../../components/profileButton/ProfileButton';
import './Lobby.css';

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
        <div className='header'>{<TextHeading />}</div>
        <div className='left-section'>{startGame}</div>
      </div>
      {
        // TODO: Have to do somethings to make it look good...
        <div className='right-section'>
          <div className='profile-tab'>{<ProfileButton />}</div>
        </div>
      }
      {/*<div className='footer'></div>*/}
    </div>
  );
}

export default Lobby;
