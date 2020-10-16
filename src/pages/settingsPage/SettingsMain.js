import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  preCheckUser,
  deleteAccount,
  updateAccount,
  userNameCheck,
  userActionReset,
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
import { useHistory } from 'react-router-dom';
import './SettingsMain.css';

const SettingsMain = ({
  userData,
  preCheckUser,
  deleteAccount,
  updateAccount,
  userNameCheck,
  userActionReset,
}) => {
  const history = useHistory();
  const [userNameAvailable, setUserNameAvailable] = useState(null);

  // For checking if user token is validated by server
  useEffect(() => {
    preCheckUser(history);
  }, [preCheckUser, history]);

  // Showing success alert
  const successAlert = (message) => {
    Alert.success(message);
  };

  // Showing error alert
  const errorAlert = (message) => {
    Alert.error(message);
  };

  // PreCheck error handling
  useEffect(() => {
    if (
      userData.preCheckData.error &&
      userData.preCheckData.error.payload === undefined
    ) {
      errorAlert(userData.preCheckData.error);
      localStorage.removeItem('token');
      history.push('/login');
      userActionReset();
    }
  }, [userData.preCheckData.error, userActionReset, history]);

  // Delete account error handling
  useEffect(() => {
    if (
      userData.deleteAccountData.error &&
      userData.deleteAccountData.error.payload !== undefined
    ) {
      switch (userData.deleteAccountData.error.payload.message) {
        case ERROR:
          errorAlert("Couldn't delete your account, please try again later!");
          userActionReset();
          break;
        default:
          errorAlert("Couldn't delete your account, please try again later!");
          userActionReset();
          break;
      }
    } else if (userData.deleteAccountData.error) {
      errorAlert(userData.deleteAccountData.error);
      userActionReset();
    }
  }, [userData.deleteAccountData.error, userActionReset]);

  // Update account error handling
  useEffect(() => {
    if (
      userData.updateAccountData.error &&
      userData.updateAccountData.error.payload !== undefined
    ) {
      switch (userData.updateAccountData.error.payload.message) {
        case ERROR:
          errorAlert("Couldn't update your profile, please try again later!");
          userActionReset();
          break;
        default:
          errorAlert("Couldn't update your profile, please try again later!");
          userActionReset();
          break;
      }
    } else if (userData.updateAccountData.error) {
      errorAlert(userData.updateAccountData.error);
      userActionReset();
    }
  }, [userData.updateAccountData.error, userActionReset]);

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
          userActionReset();
          break;
        case ERROR:
          errorAlert('Some error occured! Please try again later!');
          userActionReset();
          break;
        default:
          errorAlert('Some error occured! Please try again later!');
          userActionReset();
          break;
      }
    } else if (userData.userNameCheckData.error) {
      errorAlert(userData.userNameCheckData.error);
      userActionReset();
    }
  }, [userData.userNameCheckData.error, userActionReset]);

  // Message to user when account deleted
  useEffect(() => {
    if (userData.deleteAccountData.data) {
      if (userData.deleteAccountData.data.payload.message === DELETED) {
        successAlert('Account deleted successfully!');
        history.push('/login');
        userActionReset();
      }
    }
  }, [userData.deleteAccountData.data, history, userActionReset]);

  // Message to user when account is updated
  useEffect(() => {
    if (userData.updateAccountData.data) {
      if (userData.updateAccountData.data.payload.message === UPDATE) {
        successAlert('Your profile has been updated!');
        userActionReset();
      }
    }
  }, [userData.updateAccountData.data, userActionReset]);

  // If userName is available
  useEffect(() => {
    if (userData.userNameCheckData.data) {
      if (userData.userNameCheckData.data.payload.message === AVAILABLE) {
        setUserNameAvailable(true);
      }
    }
  }, [userData.userNameCheckData.data, userActionReset]);

  // UI if user is valid and properly authenticated
  let content = (
    <div className='settings-page'>
      <NavBar loggedIn={true} />
      <SettingsBody
        sendDeleteAccountLoading={userData.deleteAccountData.isLoading}
        sendUpdateAccountLoading={userData.updateAccountData.isLoading}
        sendUserNameAvailable={userNameAvailable}
        getDeleteAccount={() => deleteAccount(history)}
        getUpdateAccountData={(data) => updateAccount(history, data)}
        getUserNameCheckData={(data) => userNameCheck(history, data)}
      />
    </div>
  );

  // Pre-check running
  if (userData.preCheckData.isLoading) {
    content = (
      <div className='settings-page-precheck-loading'>
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
  userActionReset,
})(SettingsMain);
