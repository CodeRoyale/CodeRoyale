import React, { useState } from 'react';
import './ProfileSettingsMain.css';
import SettingsField from '../../components/settingsField/SettingsField';
import Button from '../../components/button/Button';
import { Alert, Loader } from 'rsuite';

const SettingsBody = () => {
  const CLIENT_URL = process.env.REACT_APP_CLIENT_URL;
  const DELETE_API = `${process.env.REACT_APP_USER_API_URL}/users/delete`;
  let profileData = localStorage.getItem('user-data');
  profileData = JSON.parse(profileData);
  const [firstName, setFirstName] = useState(profileData.firstName);
  const [lastName, setLastName] = useState(profileData.lastName);
  const email = profileData.email;
  const [isLoading, setIsLoading] = useState(false);

  // Message to user for delete account error
  const deleteError = (msg) => {
    Alert.error(msg);
  };

  // Message to user for delete account success
  const deleteSuccess = (msg) => {
    Alert.success(msg);
  };

  // Function to delete account
  const deleteAccount = () => {
    setIsLoading(true);
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
        setIsLoading(false);
        if (jsonRes.message === 'Account deleted successfully') {
          deleteSuccess('Account deleted successfully');
          localStorage.removeItem('access-token');
          localStorage.removeItem('user-data');
        } else {
          deleteError('Sorry, your account could not be deleted');
        }
      });
  };

  // Default content
  let content = (
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

  if (isLoading) {
    content = (
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
            <Loader size='md' content='Deleting you account...' />
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
  }

  return content;
};

export default SettingsBody;
