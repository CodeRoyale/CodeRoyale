import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  deleteAccount,
  updateAccount,
  actionReset,
} from '../../actions/userActions';
import SettingsBody from './SettingsBody';
import NavBar from '../../components/navBar/NavBar';
import { Alert } from 'rsuite';
import { ERROR, DELETED, UPDATE } from '../../utils/constants';
import { useHistory } from 'react-router-dom';
import './SettingsMain.css';

const SettingsMain = ({ userData, deleteAccount, updateAccount }) => {
  const history = useHistory();

  const handleDeleteAccount = () => {
    deleteAccount();
  };

  const handleUpdateAccount = (data) => {
    console.log(data);
    updateAccount(data);
  };

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
    if (userData.deleteAccountData.error) {
      switch (userData.deleteAccountData.error) {
        case ERROR:
          errorAlert("Couldn't delete your account, please try again later!");
          actionReset();
          break;
        default:
          errorAlert("Couldn't delete your account, please try again later!");
          actionReset();
          break;
      }
    }
  }, [userData.deleteAccountData.error]);

  // Update account error handling
  useEffect(() => {
    if (userData.updateAccountData.error) {
      switch (userData.updateAccountData.error) {
        case ERROR:
          errorAlert("Couldn't update your profile, please try again later!");
          actionReset();
          break;
        default:
          errorAlert("Couldn't update your profile, please try again later!");
          actionReset();
          break;
      }
    }
  }, [userData.updateAccountData.error]);

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
  }, [userData.deleteAccountData.data]);

  // Message to user when account is updated
  useEffect(() => {
    if (userData.updateAccountData.data) {
      if (userData.updateAccountData.data.payload.message === UPDATE) {
        successAlert('Your profile has been updated!');
        actionReset();
      }
    }
  }, [userData.updateAccountData.data]);

  return (
    <div className='settings-page'>
      <NavBar />
      <SettingsBody
        deleteAccountLoading={userData.deleteAccountData.isLoading}
        updateAccountLoading={userData.updateAccountData.isLoading}
        deleteAccount={handleDeleteAccount}
        updateAccount={handleUpdateAccount}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  userData: state.userData,
});

export default connect(mapStateToProps, {
  deleteAccount,
  updateAccount,
  actionReset,
})(SettingsMain);
