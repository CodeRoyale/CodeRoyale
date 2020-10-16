import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { signUpUser, userActionReset } from '../../actions/userActions';
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

const SignUpMain = ({ userData, signUpUser, userActionReset }) => {
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
    if (
      userData.signUpData.error &&
      userData.signUpData.error.payload !== undefined
    ) {
      switch (userData.signUpData.error.payload.message) {
        case CONFLICT:
          alert(
            'error',
            'Error on Signup',
            'You have already registered! Login to use CodeRoyale'
          );
          history.push('/login');
          userActionReset();
          break;
        case MISSING:
        case ERROR:
        case ERRORTOKEN:
          alert(
            'error',
            'Error on Signup',
            'Some error occurred, please try again later'
          );
          userActionReset();
          break;
        default:
          alert(
            'error',
            'Error on Signup',
            'Some error occurred, please try again later'
          );
          userActionReset();
          break;
      }
    } else if (userData.signUpData.error) {
      alert('error', 'Error on Signup', userData.signUpData.error);
      userActionReset();
    }
  }, [userData.signUpData.error, userActionReset, history]);

  // Check if user registered successfully
  useEffect(() => {
    if (userData.signUpData.data) {
      if (userData.signUpData.data.payload.message === CREATED) {
        alert(
          'success',
          'Registered successfully',
          'Welcome to CodeRoyale! Login to compete'
        );
        userActionReset();
        history.push('/login');
      }
    }
  }, [userData.signUpData.data, history, userActionReset]);

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

export default connect(mapStateToProps, { signUpUser, userActionReset })(
  SignUpMain
);
