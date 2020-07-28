import React from 'react';
import './ProfileSettingsMain.css';
import SettingsBody from './SettingsBody';
import NavBar from '../../components/navBar/NavBar';

function ProfileSettingsMain() {
  return (
    <div className='profile-settings'>
      <NavBar />
      <div className='settings-body-container'>
        <SettingsBody />
      </div>
    </div>
  );
}

export default ProfileSettingsMain;
