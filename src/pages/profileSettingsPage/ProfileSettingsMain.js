import React from 'react';
import Header from '../../components/header/Header';
import './ProfileSettingsMain.css';
import { Input } from 'semantic-ui-react';

//components used from https://react.semantic-ui.com/

const userEmailId = 'recoilop@gmail.com'; //to be fetched from api

function ProfileSettingsMain() {
  return (
    <div>
      <Header></Header>

      <div className='settings-title'>Profile Settings</div>

      <div className='options-header'>First Name</div>
      <div className='options-input'>
        <Input fluid style={{ width: '370px' }} />
      </div>
      <div className='options-header'>Last Name</div>
      <div className='options-input'>
        <Input fluid style={{ width: '670px' }} />
      </div>
      <div className='options-header'>Email Id</div>
      <div className='options-input'>
        <Input disabled placeholder={userEmailId} style={{ width: '500px' }} />
      </div>

      <button className='save-button'>Save Settings</button>
    </div>
  );
}

export default ProfileSettingsMain;
