import React from 'react';
import SettingsPageHeader from '../../components/settingsPageHeader/SettingsPageHeader';
import './ProfileSettingsMain.css';
import Options from './Options/Options';

function ProfileSettingsMain() {
  return (
    <div className='profile-settings'>
      <SettingsPageHeader />
      <div className='options-container'>
        <Options />
      </div>
    </div>
  );
}

export default ProfileSettingsMain;
