import React from 'react';
import ShareLinkCardFriend from './ShareLinkCardFriend';
import './LobbyMain.css';
import NavBar from '../../components/navBar/NavBar';
import { Redirect } from 'react-router';
import profileData from '../../utils/examples';

const LobbyMain = () => {
  const accessToken = () => {
    let ac = localStorage.getItem('access-token');
    if (ac === null) {
      return false;
    } else {
      return true;
    }
  };

  const isLoggedIn = accessToken ? true : false;

  let content = (
    <div className='lobby'>
      <div className='lobby-header'>
        <NavBar />
      </div>
      <div className='lobby-body'>
        <ShareLinkCardFriend
          profileData={profileData}
          sharableLink='Share this link'
        />
      </div>
    </div>
  );

  if (!isLoggedIn) {
    content = <Redirect to='/' />;
  }
  return content;
};

export default LobbyMain;
