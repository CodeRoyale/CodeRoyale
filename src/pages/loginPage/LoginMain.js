import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/loginActions';
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

const LoginMain = ({ loginData, loginUser }) => {
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
    if (loginData.error) {
      switch (loginData.error.payload.message) {
        case REGISTER:
          alert(
            'Error on Login',
            'You will have to Sign Up first to use CodeRoyale!'
          );
          break;
        case AUTHERROR:
          alert(
            'Error on Login',
            'Some error occurred, please try again later'
          );
          break;
        case ERROR:
          alert(
            'Error on Login',
            'Some error occurred, we are working to fix it'
          );
          break;
        case INVALID:
          alert(
            'Error on Login',
            'Some error occurred, please try again later'
          );
          break;
        default:
          alert(
            'Error on Login',
            'Some error occurred, please try again later'
          );
          break;
      }
    }
  }, [loginData.error]);

  // Checking if user logged in successfully
  useEffect(() => {
    if (loginData.data) {
      if (loginData.data.payload.message === LOGIN) {
        history.push('/dashboard');
      }
    }
  }, [loginData.data, history]);

  // Default content
  let content = (
    <div className='login-page'>
      <LeftSecLogin />
      <LoginSec isLoading={loginData.isLoading} getAuthData={handleAuthData} />
    </div>
  );

  return content;
};

const mapStateToProps = (state) => ({
  loginData: state.loginData,
});

export default connect(mapStateToProps, { loginUser })(LoginMain);
