import React, { useState } from 'react';
import './SettingsBody.css';
import SettingsField from '../../../components/settingsField/SettingsField';
import Button from '../../../components/button/Button';

function SettingsBody() {
  const [firstName, setFirstName] = useState('Alan');
  const [lastName, setLastName] = useState('Henry');
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
        <SettingsField
          heading='Email'
          value='alanhenry@gmail.com'
          disabled={true}
        />
        <div className='settings-save-button'>
          <Button
            type='button'
            buttonStyle='btn--primary--normal'
            buttonSize='btn--large'
          >
            Save Settings
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
