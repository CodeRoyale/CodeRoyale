import React from 'react';
import './ProfileSettingsMain.css';
import SettingsHeader from '../../components/settingsHeader/SettingsHeader';
import SettingsBody from './settingsBody/SettingsBody';

function ProfileSettingsMain() {
  return (
    <div className='profile-settings'>
      <SettingsHeader />
      <div className='settings-body-container'>
        <SettingsBody />
      </div>
    </div>
  );
}

export default ProfileSettingsMain;
