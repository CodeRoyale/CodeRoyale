import React from 'react';
import './ProfileSettingsMain.css';
import Options from './Options/Options';
import SettingsHeader from '../../components/settingsHeader/SettingsHeader';

function ProfileSettingsMain() {
  return (
    <div className='profile-settings'>
      <SettingsHeader />
      <div className='options-container'>
        <Options />
      </div>
    </div>
  );
}

export default ProfileSettingsMain;
