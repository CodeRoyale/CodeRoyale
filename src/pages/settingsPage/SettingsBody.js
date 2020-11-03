import React, { useState } from 'react';
import SettingsField from '../../components/settingsField/SettingsField';
import Button from '../../components/button/Button';
import { Loader } from 'rsuite';
import profileData from '../../utils/profileData';
import './SettingsMain.css';

const SettingsBody = ({
  getDeleteAccount,
  getUpdateAccountData,
  getUserNameCheckData,
  sendUserNameAvailable,
  sendDeleteAccountLoading,
  sendUpdateAccountLoading,
}) => {
  // User info
  const [userName, setUserName] = useState(profileData.userName);
  const [firstName, setFirstName] = useState(profileData.firstName);
  const [lastName, setLastName] = useState(profileData.lastName);
  const email = profileData.email;

  // New user info for updation
  const [newAccountData, setNewAccountData] = useState(null);

  // Default content
  let content = (
    <div className='settings-container'>
      <div className='settings-profile'>
        <h2 className='settings-title'>Profile Settings</h2>
        <SettingsField
          fieldSize={50}
          heading='Username'
          value={userName}
          disabled={false}
          checkUserNameAvailability={true}
          userNameAvailable={sendUserNameAvailable}
          onChange={(e) => {
            setUserName(e.target.value);
            setNewAccountData({ ...newAccountData, userName: e.target.value });
          }}
          onBlur={() => {
            if (newAccountData != null && newAccountData.userName != null) {
              // Sending userName in props to check if available or not to SettingsMain
              getUserNameCheckData(newAccountData.userName);
            }
          }}
        />
        <SettingsField
          fieldSize={50}
          heading='First Name'
          value={firstName}
          disabled={false}
          checkAvailability={false}
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
          checkAvailability={false}
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
          checkAvailability={false}
        />
        <div className='settings-save-button'>
          <Button
            type='button'
            buttonStyle='btn--primary--normal'
            buttonSize='btn--large'
            onClick={() => {
              // Send new account data in props to SettingsMain for updating account
              getUpdateAccountData(newAccountData);
            }}
          >
            Save Settings
          </Button>
        </div>
        <div className='settings-delete-account-button'>
          <Button
            type='button'
            buttonStyle='btn--primary--logout'
            buttonSize='btn--large'
            onClick={() => {
              // Send trigger to SettingsMain to delete account in props
              getDeleteAccount();
            }}
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

  // Show loading if user deletes or updates account
  if (sendDeleteAccountLoading || sendUpdateAccountLoading) {
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
