import React from 'react';
import './ProfileSettingsMain.css';
import DashboardNavBar from '../../components/dashboardNavBar/DashboardNavBar';
import SettingsBody from './settingsBody/SettingsBody';

function ProfileSettingsMain() {
  return (
    <div className='profile-settings'>
      <DashboardNavBar />
      <div className='settings-body-container'>
        <SettingsBody />
      </div>
    </div>
  );
}

export default ProfileSettingsMain;
