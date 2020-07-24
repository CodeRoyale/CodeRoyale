import React from 'react';
import './Options.css';
import SaveButton from '../../../components/saveButton/SaveButton';
import SettingsField from '../../../components/settingsField/SettingsField';

function Options() {
  return (
    <div className='settings-container'>
      <div>
        <div className='settings-title'>Profile Settings</div>

        <SettingsField heading='First Name' value='Alan' disabled={false} />
        <SettingsField heading='Last Name' value='Henry' disabled={false} />
        <SettingsField
          heading='Email'
          value='alanhenryjoel@gmail.com'
          disabled={true}
        />

        <SaveButton />
      </div>

      <div className='setting-separator' />

      <img
        className='settings-image'
        alt='setting illustration'
        src='/images/settings.svg'
      />
    </div>
  );
}

export default Options;
