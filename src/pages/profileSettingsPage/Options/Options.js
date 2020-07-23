import React from 'react';
import './Options.css';
import SettingsInput from '../../../components/settingsInput/SettingsInput';
import SaveButton from '../../../components/saveButton/SaveButton';

function Options() {
  return (
    <div className='settings-container'>
      <div>
        <div className='settings-title'>Profile Settings</div>

        <SettingsInput heading='First Name' value='Alan' disabled={false} />
        <SettingsInput heading='Last Name' value='Henry' disabled={false} />
        <SettingsInput
          heading='Email'
          value='alanhenry@gmail.com'
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
