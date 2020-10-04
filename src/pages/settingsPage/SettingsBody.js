import React, { useState } from 'react';
import SettingsField from '../../components/settingsField/SettingsField';
import Button from '../../components/button/Button';
import { Loader } from 'rsuite';
import './SettingsMain.css';

const SettingsBody = (props) => {
  let profileData = localStorage.getItem('user-data');
  profileData = JSON.parse(profileData);
  const [firstName, setFirstName] = useState(profileData.firstName);
  const [lastName, setLastName] = useState(profileData.lastName);
  const email = profileData.email;

  // Function to delete account
  const deleteAccount = () => {
    props.deleteAccount();
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
        {!props.deleteAccountLoading ? (
          <div className='settings-delete-profile-button'>
            <Button
              type='button'
              buttonStyle='btn--primary--logout'
              buttonSize='btn--large'
              onClick={deleteAccount}
            >
              Delete my Account
            </Button>
          </div>
        ) : (
          <div className='settings-delete-profile-button'>
            <Loader size='md' content='Deleting you account...' />
          </div>
        )}
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
