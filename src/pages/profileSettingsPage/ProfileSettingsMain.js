import React from 'react';
import SettingsPageHeader from '../../components/SettingsPageHeader/SettingsPageHeader';
import './ProfileSettingsMain.css';
import Options from './Options/Options';

function ProfileSettingsMain() {
  return (
    <div>
      <SettingsPageHeader />
      <Options />
    </div>
  );
}

export default ProfileSettingsMain;
