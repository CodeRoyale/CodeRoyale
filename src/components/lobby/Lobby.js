import React, { useState } from 'react';
import './Lobby.css';
import LogoContainer from '../logoContainer/LogoContainer';
import ProfileButton from '../profileButton/ProfileButton';
import PlayFriendButton from '../playFriendButton/PlayFriendButton';
import PlayRandomButton from '../playRandomButton/PlayRandomButton';
import ShareLinkFriend from '../../pages/lobbyPage/shareLinkCardFriend/ShareLinkCardFriend';
import lobby_image from '../assets/images/lobby_image.svg';

function Lobby() {
  const alreadyClickedStartFriend = false; // Get this from API...
  const alreadyClickedStartRandom = false; // Get this form API...
  const friendLink = 'Share this link to start'; // get this from API...
  const profileData = {
    imageUrl:
      'https://media-exp1.licdn.com/dms/image/C5103AQHuIxezqseoGQ/profile-displayphoto-shrink_200_200/0?e=1597276800&v=beta&t=tREaHG412Mr99Tfke80DMtuQtVQyB4378ptl3SlwDvI',
    username: 'Sawarni Swaroop',
    email: 'sawarni99@gmail.com',
  }; // Get this from API...

  const [clickedStartFriend, setClickedStartFriend] = useState(
    alreadyClickedStartFriend
  );
  const [clickedStartRandom, setClickedStartRandom] = useState(
    alreadyClickedStartRandom
  );

  const onClickStartFriend = (clicked) => {
    setClickedStartFriend(true);
  };

  const onClickStartRandom = (clicked) => {
    setClickedStartRandom(true);
  };

  let startGame;
  if (clickedStartFriend) {
    startGame = (
      <div className='lobby-link-share-card'>
        <ShareLinkFriend profileData={profileData} sharableLink={friendLink} />
      </div>
    );
  } else if (clickedStartRandom) {
    // TODO: UI when clicked play with random...
    startGame = (
      <div className='lobby-link-share-card'>
        <ShareLinkFriend profileData={profileData} sharableLink={friendLink} />
      </div>
    );
  } else {
    startGame = (
      <>
        <div className='lobby-body-left'>
          {/*<b className='lobby-text-dashboard'>Dashboard</b>*/}
          {/*<div className='lobby-design-dashboard'></div>*/}
          <div className='lobby-text-heading'>
            <b>
              Compete Your Coding Skills <br /> With Others
            </b>
          </div>
          <div className='lobby-play-body'>
            <div className='lobby-play-friends'>
              <b>Play with a friend</b>
              <br />
              <span>
                Invite a friend to a unique coding room to battle out your
                competitive programming skills.
              </span>
              <br />
              <PlayFriendButton onClick={onClickStartFriend} />
            </div>
            <div className='lobby-play-random'>
              <b>Play with a random coder</b>
              <br />
              <span>
                Get mapped into a coding room with a random coder to battle out
                your competitive programming skills.
              </span>
              <br />
              <PlayRandomButton onClick={onClickStartRandom} />
            </div>
          </div>
        </div>
        <div className='lobby-body-right'>
          <img className='lobby-image' src={lobby_image} alt='' />
        </div>
      </>
    );
  }

  return (
    <div className='lobby'>
      <div className='lobby-header'>
        <div className='lobby-logo'>
          <LogoContainer />
        </div>
        <div className='lobby-profile'>
          <ProfileButton profileData={profileData} />
        </div>
      </div>
      <div className='lobby-body'>{startGame}</div>
      <div className='lobby-footer'></div>
    </div>
  );
}

export default Lobby;
