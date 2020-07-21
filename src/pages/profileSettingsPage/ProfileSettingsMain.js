import React from 'react';
import Header from '../../components/header/Header';
import './ProfileSettingsMain.css';

const userEmailId = 'recoilop@gmail.com'; //to be fetched from api

function ProfileSettingsMain() {
  return (
    <div>
      <Header></Header>

      <div className='settings-title'>Profile Settings</div>

      <div className='options-header'>First Name</div>
      <div>
        <input type='text' size='90' className='options-input'></input>
      </div>
      <div className='options-header'>Last Name</div>
      <div>
        <input type='text' size='90' className='options-input'></input>
      </div>
      <div className='options-header'>Email Id</div>
      <div>
        <input
          type='text'
          size='90'
          disabled
          placeholder={userEmailId}
          className='options-input'
        ></input>
      </div>

      <button className='save-button'>Save Settings</button>
    </div>
  );
}

export default ProfileSettingsMain;
