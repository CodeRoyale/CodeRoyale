import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteAccount, actionReset } from '../../actions/userActions';
import SettingsBody from './SettingsBody';
import NavBar from '../../components/navBar/NavBar';
import { Alert } from 'rsuite';
import { ERROR, DELETED } from '../../utils/constants';
import { useHistory } from 'react-router-dom';
import './SettingsMain.css';

const SettingsMain = ({ userData, deleteAccount }) => {
  const history = useHistory();

  const handleDeleteAccount = () => {
    deleteAccount(history);
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
          errorAlert("Couldn't delete account, please try again later!");
          actionReset();
          break;
        default:
          errorAlert("Couldn't delete account, please try again later!");
          actionReset();
          break;
      }
    }
  }, [userData.deleteAccountData.error]);

  useEffect(() => {
    if (userData.deleteAccountData.data) {
      if (userData.deleteAccountData.data.payload.message === DELETED) {
        successAlert('Account deleted successfully!');
        localStorage.removeItem('token');
        actionReset();
        // history.push('/login');
      }
    }
  }, [userData.deleteAccountData.data, history]);

  return (
    <div className='settings'>
      <NavBar />
      <div className='settings-body'>
        <SettingsBody
          deleteAccountLoading={userData.deleteAccountData.isLoading}
          deleteAccount={handleDeleteAccount}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userData: state.userData,
});

export default connect(mapStateToProps, { deleteAccount, actionReset })(
  SettingsMain
);
