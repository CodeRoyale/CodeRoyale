import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loginUser, actionReset } from '../../actions/userActions';
import LeftSecLogin from './LeftSecLogin';
import LoginSec from './LoginSec';
import { useHistory } from 'react-router-dom';
import { Notification } from 'rsuite';
import {
  LOGIN,
  REGISTER,
  AUTHERROR,
  ERROR,
  INVALID,
} from '../../utils/constants';
import './LoginMain.css';

const LoginMain = ({ userData, loginUser, actionReset }) => {
  const history = useHistory();

  const handleAuthData = (data) => {
    loginUser(data);
  };

  // Showing alert
  const alert = (title, description) => {
    Notification['error']({
      title: title,
      description: description,
    });
  };

  // Login error handling
  useEffect(() => {
    if (
      userData.loginData.error &&
      userData.loginData.error.payload !== undefined
    ) {
      switch (userData.loginData.error.payload.message) {
        case REGISTER:
          alert(
            'Error on Login',
            'You will have to Sign Up first to use CodeRoyale!'
          );
          actionReset();
          break;
        case ERROR:
          alert(
            'Error on Login',
            'Some error occurred, we are working to fix it'
          );
          actionReset();
          break;
        case AUTHERROR:
        case INVALID:
          alert(
            'Error on Login',
            'Some error occurred, please try again later'
          );
          actionReset();
          break;
        default:
          alert(
            'Error on Login',
            'Some error occurred, please try again later'
          );
          actionReset();
          break;
      }
    } else if (userData.loginData.error) {
      alert('Error on Login', userData.loginData.error);
      actionReset();
    }
  }, [userData.loginData.error, actionReset]);

  // Checking if user logged in successfully
  useEffect(() => {
    if (userData.loginData.data) {
      if (userData.loginData.data.payload.message === LOGIN) {
        history.push('/dashboard');
      }
    }
  }, [userData.loginData.data, history]);

  // Default content
  let content = (
    <div className='login-page'>
      <LeftSecLogin />
      <LoginSec
        isLoading={userData.loginData.isLoading}
        getAuthData={handleAuthData}
      />
    </div>
  );

  return content;
};

const mapStateToProps = (state) => ({
  userData: state.userData,
});

export default connect(mapStateToProps, { loginUser, actionReset })(LoginMain);
