import React from 'react';
import './SettingsBody.css';
import SettingsField from '../../../components/settingsField/SettingsField';
import Button from '../../../components/button/Button';

function SettingsBody() {
  return (
    <div className='settings-container'>
      <div className='settings-forms'>
        <div className='settings-title'>Profile Settings</div>

        <SettingsField heading='First Name' value='Alan' disabled={false} />
        <SettingsField heading='Last Name' value='Henry' disabled={false} />
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

      <img
        className='settings-image'
        alt='setting illustration'
        src='/images/settings.svg'
      />
    </div>
  );
}

export default SettingsBody;
