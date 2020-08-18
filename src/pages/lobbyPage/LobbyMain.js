import React from 'react';
import ShareLinkCardFriend from './ShareLinkCardFriend';
import './LobbyMain.css';
import NavBar from '../../components/navBar/NavBar';
import { Redirect } from 'react-router';
import profileData from '../../utils/examples';

const LobbyMain = () => {
  const accessToken = localStorage.getItem('access-token');
  if (accessToken === null) {
    return <Redirect to='/' />;
  }

  return (
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
};

export default LobbyMain;
