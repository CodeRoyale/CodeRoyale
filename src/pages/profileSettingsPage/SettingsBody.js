import React, { useState } from 'react';
import './ProfileSettingsMain.css';
import SettingsField from '../../components/settingsField/SettingsField';
import Button from '../../components/button/Button';

const SettingsBody = () => {
  const CLIENT_URL = process.env.REACT_APP_CLIENT_URL;
  const DELETE_API = `${process.env.REACT_APP_SERVER_URL}/users/delete`;
  let profileData = localStorage.getItem('user-data');
  profileData = JSON.parse(profileData);
  const [firstName, setFirstName] = useState(profileData.firstName);
  const [lastName, setLastName] = useState(profileData.lastName);
  const email = profileData.email;

  // Function to delete account
  const deleteAccount = () => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Origin', CLIENT_URL);
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append(
      'Authorization',
      `Bearer ${localStorage.getItem('access-token')}`
    );

    fetch(DELETE_API, {
      method: 'DELETE',
      headers,
    })
      .then((res) => res.json())
      .then((jsonRes) => {
        if (jsonRes.message === 'Account deleted successfully') {
          localStorage.removeItem('access-token');
          localStorage.removeItem('user-data');
        }
        console.log(jsonRes);
      });
  };

  return (
    <div className='settings-container'>
      <div className='settings-forms'>
        <div className='settings-title'>Profile Settings</div>

        <SettingsField
          heading='First Name'
          value={firstName}
          disabled={false}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <SettingsField
          heading='Last Name'
          value={lastName}
          disabled={false}
          onChange={(e) => setLastName(e.target.value)}
        />
        <SettingsField heading='Email' value={email} disabled={true} />
        <div className='settings-save-button'>
          <Button
            type='button'
            buttonStyle='btn--primary--normal'
            buttonSize='btn--large'
          >
            Save Settings
          </Button>
        </div>
        <div className='settings-deactivate-profile-button'>
          <Button
            type='button'
            buttonStyle='btn--primary--logout'
            buttonSize='btn--large'
            onClick={deleteAccount}
          >
            Delete my Account
          </Button>
        </div>
      </div>

      <div className='settings-separator'></div>

      <img
        className='settings-image'
        alt='setting illustration'
        src='/images/settings.svg'
      />
    </div>
  );
};

export default SettingsBody;
