import React from 'react';
import './ProfileSettingsMain.css';
import SettingsBody from './SettingsBody';
import NavBar from '../../components/navBar/NavBar';
import { Redirect } from 'react-router-dom';

const ProfileSettingsMain = () => {
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
    <div className='profile-settings'>
      <NavBar />
      <div className='settings-body-container'>
        <SettingsBody />
      </div>
    </div>
  );

  if (!isLoggedIn) {
    content = <Redirect to='/' />;
  }

  return content;
};

export default ProfileSettingsMain;
