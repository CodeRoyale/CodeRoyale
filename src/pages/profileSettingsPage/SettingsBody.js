import React, { useState } from 'react';
import './ProfileSettingsMain.css';
import SettingsField from '../../components/settingsField/SettingsField';
import Button from '../../components/button/Button';

function SettingsBody() {
  let profileData = localStorage.getItem('user-data');
  profileData = JSON.parse(profileData);
  const [firstName, setFirstName] = useState(profileData.firstName);
  const [lastName, setLastName] = useState(profileData.lastName);
  const email = profileData.email;

  // Function to deactivate account
  const deactivateAccount = () => {
    // TODO: Call to delete api
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
            onClick={deactivateAccount}
          >
            Deactivate my Account
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
}

export default SettingsBody;
