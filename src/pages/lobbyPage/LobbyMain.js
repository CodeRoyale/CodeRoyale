import React from 'react';
import ChooseRoomCard from './ChooseRoomCard';
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
        <ChooseRoomCard
          profileData={profileData}
          sharableLink='Share this link'
        />
      </div>
    </div>
  );
};

export default LobbyMain;
