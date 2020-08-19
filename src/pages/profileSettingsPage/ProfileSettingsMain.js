import React from 'react';
import './ProfileSettingsMain.css';
import SettingsBody from './SettingsBody';
import NavBar from '../../components/navBar/NavBar';
import { Redirect } from 'react-router-dom';

const ProfileSettingsMain = () => {
  const accessToken = localStorage.getItem('access-token');
  if (accessToken === null) {
    return <Redirect to='/' />;
  }

  return (
    <div className='profile-settings'>
      <NavBar />
      <div className='settings-body-container'>
        <SettingsBody />
      </div>
    </div>
  );
};

export default ProfileSettingsMain;
