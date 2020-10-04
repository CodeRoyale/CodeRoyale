import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { signUpUser, actionReset } from '../../actions/userActions';
import LeftSecSignUp from './LeftSecSignUp';
import SignUpSec from './SignUpSec';
import { useHistory } from 'react-router-dom';
import { Notification } from 'rsuite';
import {
  CONFLICT,
  CREATED,
  MISSING,
  ERROR,
  ERRORTOKEN,
} from '../../utils/constants';
import './SignUpMain.css';

const SignUpMain = ({ userData, signUpUser, actionReset }) => {
  const history = useHistory();

  const handleAuthData = (data) => {
    signUpUser(data);
  };

  // Showing alert
  const alert = (type, title, description) => {
    Notification[type]({
      title: title,
      description: description,
    });
  };

  useEffect(() => {
    if (userData.signUpData.error) {
      switch (userData.signUpData.error.payload.message) {
        case CONFLICT:
          alert(
            'error',
            'Error on Signup',
            'You have already registered! Login to use CodeRoyale'
          );
          history.push('/login');
          actionReset();
          break;
        case MISSING:
          alert(
            'error',
            'Error on Signup',
            'Some error occurred, please try again later'
          );
          actionReset();
          break;
        case ERROR:
          alert(
            'error',
            'Error on Signup',
            'Some error occurred, please try again later'
          );
          actionReset();
          break;
        case ERRORTOKEN:
          alert(
            'error',
            'Error on Signup',
            'Some error occurred, please try again later'
          );
          actionReset();
          break;
        default:
          alert(
            'error',
            'Error on Signup',
            'Some error occurred, please try again later'
          );
          actionReset();
          break;
      }
    }
  }, [userData.signUpData.error, actionReset, history]);

  // Check if user registered successfully
  useEffect(() => {
    if (userData.signUpData.data) {
      if (userData.signUpData.data.payload.message === CREATED) {
        alert(
          'success',
          'Registered successfully',
          'Welcome to CodeRoyale! Login to compete'
        );
        actionReset();
        history.push('/login');
      }
    }
  }, [userData.signUpData.data, history, actionReset]);

  // Default content
  let content = (
    <div className='signup-page'>
      <LeftSecSignUp />
      <SignUpSec
        isLoading={userData.signUpData.isLoading}
        getAuthData={handleAuthData}
      />
    </div>
  );

  return content;
};

const mapStateToProps = (state) => ({
  userData: state.userData,
});

export default connect(mapStateToProps, { signUpUser, actionReset })(
  SignUpMain
);
