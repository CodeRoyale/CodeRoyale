import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  preCheckUser,
  deleteAccount,
  updateAccount,
  userNameCheck,
  actionReset,
} from '../../actions/userActions';
import SettingsBody from './SettingsBody';
import NavBar from '../../components/navBar/NavBar';
import { Alert, Loader } from 'rsuite';
import {
  ERROR,
  DELETED,
  UPDATE,
  AVAILABLE,
  CONFLICT,
} from '../../utils/constants';
import './SettingsMain.css';

const SettingsMain = ({
  userData,
  preCheckUser,
  deleteAccount,
  updateAccount,
  userNameCheck,
  actionReset,
}) => {
  const [userNameAvailable, setUserNameAvailable] = useState(null);

  // For checking if user token is validated by server
  useEffect(() => {
    preCheckUser();
  }, [preCheckUser]);

  // Showing success alert
  const successAlert = (message) => {
    Alert.success(message);
  };

  // Showing error alert
  const errorAlert = (message) => {
    Alert.error(message);
  };

  // Delete account error handling
  useEffect(() => {
    if (
      userData.deleteAccountData.error &&
      userData.deleteAccountData.error.payload !== undefined
    ) {
      switch (userData.deleteAccountData.error.payload.message) {
        case ERROR:
          errorAlert("Couldn't delete your account, please try again later!");
          actionReset();
          break;
        default:
          errorAlert("Couldn't delete your account, please try again later!");
          actionReset();
          break;
      }
    } else if (userData.deleteAccountData.error) {
      errorAlert(userData.deleteAccountData.error);
      actionReset();
    }
  }, [userData.deleteAccountData.error, actionReset]);

  // Update account error handling
  useEffect(() => {
    if (
      userData.updateAccountData.error &&
      userData.updateAccountData.error.payload !== undefined
    ) {
      switch (userData.updateAccountData.error.payload.message) {
        case ERROR:
          errorAlert("Couldn't update your profile, please try again later!");
          actionReset();
          break;
        default:
          errorAlert("Couldn't update your profile, please try again later!");
          actionReset();
          break;
      }
    } else if (userData.updateAccountData.error) {
      errorAlert(userData.updateAccountData.error);
      actionReset();
    }
  }, [userData.updateAccountData.error, actionReset]);

  /* 
    - Show user if userName is not available if conflict from server
    - userName checking error handling
  */
  useEffect(() => {
    if (
      userData.userNameCheckData.error &&
      userData.userNameCheckData.error.payload !== undefined
    ) {
      switch (userData.userNameCheckData.error.payload.message) {
        case CONFLICT:
          setUserNameAvailable(false);
          actionReset();
          break;
        case ERROR:
          errorAlert('Some error occured! Please try again later!');
          actionReset();
          break;
        default:
          errorAlert('Some error occured! Please try again later!');
          actionReset();
          break;
      }
    } else if (userData.userNameCheckData.error) {
      errorAlert(userData.userNameCheckData.error);
      actionReset();
    }
  }, [userData.userNameCheckData.error, actionReset]);

  // Message to user when account deleted
  useEffect(() => {
    if (userData.deleteAccountData.data) {
      if (userData.deleteAccountData.data.payload.message === DELETED) {
        successAlert('Account deleted successfully!');
        localStorage.removeItem('token');
        actionReset();
        // history.push('/login');
      }
    }
  }, [userData.deleteAccountData.data, actionReset]);

  // Message to user when account is updated
  useEffect(() => {
    if (userData.updateAccountData.data) {
      if (userData.updateAccountData.data.payload.message === UPDATE) {
        successAlert('Your profile has been updated!');
        actionReset();
      }
    }
  }, [userData.updateAccountData.data, actionReset]);

  // If userName is available
  useEffect(() => {
    if (userData.userNameCheckData.data) {
      if (userData.userNameCheckData.data.payload.message === AVAILABLE) {
        setUserNameAvailable(true);
      }
    }
  }, [userData.userNameCheckData.data, actionReset]);

  // UI if user is valid and properly authenticated
  let content = (
    <div className='settings-page'>
      <NavBar loggedIn={true} />
      <SettingsBody
        sendDeleteAccountLoading={userData.deleteAccountData.isLoading}
        sendUpdateAccountLoading={userData.updateAccountData.isLoading}
        sendUserNameAvailable={userNameAvailable}
        getDeleteAccount={() => deleteAccount()}
        getUpdateAccountData={(data) => updateAccount(data)}
        getUserNameCheckData={(data) => userNameCheck(data)}
      />
    </div>
  );

  // Pre-check running
  if (userData.preCheckData.isLoading) {
    content = (
      <div className='settings-page'>
        <Loader size='sm' content='Loading...' />
      </div>
    );
  }

  return content;
};

const mapStateToProps = (state) => ({
  userData: state.userData,
});

export default connect(mapStateToProps, {
  preCheckUser,
  deleteAccount,
  updateAccount,
  userNameCheck,
  actionReset,
})(SettingsMain);
