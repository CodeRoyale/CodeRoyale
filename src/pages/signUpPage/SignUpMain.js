import React from 'react';
import { connect } from 'react-redux';
import { signUpUser } from '../../actions/signUpActions';
import LeftSecSignUp from './LeftSecSignUp';
import SignUpSec from './SignUpSec';
import { Redirect } from 'react-router';
import './SignUpMain.css';

const SignUpMain = (props) => {
  const handleAuthData = (data) => {
    props.signUpUser(data);
  };

  let content = (
    <div className='signup-page'>
      <LeftSecSignUp />
      <SignUpSec
        isLoading={props.signUpData.isLoading}
        getAuthData={handleAuthData}
      />
    </div>
  );

  if (props.loginData.isLoggedIn) {
    content = <Redirect to='/dashboard' />;
  }
  return content;
};

const mapStateToProps = (state) => ({
  loginData: state.loginData,
  signUpData: state.signUpData,
});

export default connect(mapStateToProps, { signUpUser })(SignUpMain);
