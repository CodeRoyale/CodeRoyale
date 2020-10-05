import React, { useState } from 'react';
import SettingsField from '../../components/settingsField/SettingsField';
import Button from '../../components/button/Button';
import { Loader } from 'rsuite';
import './SettingsMain.css';

const SettingsBody = (props) => {
  let profileData = localStorage.getItem('user-data');
  profileData = JSON.parse(profileData);

  const [newAccountData, setNewAccountData] = useState(null);

  const [userName, setUserName] = useState(profileData.userName);
  const [firstName, setFirstName] = useState(profileData.firstName);
  const [lastName, setLastName] = useState(profileData.lastName);
  const email = profileData.email;

  // Function to delete account
  const deleteAccount = () => {
    props.deleteAccount();
  };

  // Function to send updated account info to SettingsMain
  const updateAccount = () => {
    props.updateAccount(newAccountData);
  };

  let content = (
    <div className='settings-container'>
      <div className='settings-profile'>
        <h2 className='settings-title'>Profile Settings</h2>
        <SettingsField
          fieldSize={50}
          heading='Username'
          value={userName}
          disabled={false}
          onChange={(e) => {
            setUserName(e.target.value);
            setNewAccountData({ ...newAccountData, userName: e.target.value });
          }}
        />
        <SettingsField
          fieldSize={50}
          heading='First Name'
          value={firstName}
          disabled={false}
          onChange={(e) => {
            setFirstName(e.target.value);
            setNewAccountData({ ...newAccountData, firstName: e.target.value });
          }}
        />
        <SettingsField
          fieldSize={50}
          heading='Last Name'
          value={lastName}
          disabled={false}
          onChange={(e) => {
            setLastName(e.target.value);
            setNewAccountData({ ...newAccountData, lastName: e.target.value });
          }}
        />
        <SettingsField
          fieldSize={50}
          heading='Email'
          value={email}
          disabled={true}
        />
        <div className='settings-save-button'>
          <Button
            type='button'
            buttonStyle='btn--primary--normal'
            buttonSize='btn--large'
            onClick={updateAccount}
          >
            Save Settings
          </Button>
        </div>
        <div className='settings-delete-account-button'>
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

  if (props.deleteAccountLoading || props.updateAccountLoading) {
    content = (
      <div className='settings-container'>
        <div className='settings-profile'>
          <h2 className='settings-title'>Profile Settings</h2>
          <SettingsField
            fieldSize={50}
            heading='Username'
            value={userName}
            disabled={false}
            onChange={(e) => {
              setUserName(e.target.value);
              setNewAccountData({
                ...newAccountData,
                userName: e.target.value,
              });
            }}
          />
          <SettingsField
            fieldSize={50}
            heading='First Name'
            value={firstName}
            disabled={false}
            onChange={(e) => {
              setFirstName(e.target.value);
              setNewAccountData({
                ...newAccountData,
                firstName: e.target.value,
              });
            }}
          />
          <SettingsField
            fieldSize={50}
            heading='Last Name'
            value={lastName}
            disabled={false}
            onChange={(e) => {
              setLastName(e.target.value);
              setNewAccountData({
                ...newAccountData,
                lastName: e.target.value,
              });
            }}
          />
          <SettingsField
            fieldSize={50}
            heading='Email'
            value={email}
            disabled={true}
          />
          <div className='settings-save-button'>
            <Loader size='md' content='Loading...' />
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
