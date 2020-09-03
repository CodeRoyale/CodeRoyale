import React from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/loginActions';
import LeftSecLogin from './LeftSecLogin';
import LoginSec from './LoginSec';
import { Redirect } from 'react-router';
import './LoginMain.css';

const LoginMain = (props) => {
  const handleAuthData = (data) => {
    props.loginUser(data);
  };

  // Default content
  let content = (
    <div className='login-page'>
      <LeftSecLogin />
      <LoginSec
        isLoading={props.loginData.isLoading}
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
});

export default connect(mapStateToProps, { loginUser })(LoginMain);
