import React from 'react';
import { Link } from 'react-router-dom';
import './LoginMain.css';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import GoogleAuth from '../../components/googleAuth/GoogleAuth';
import FacebookAuth from '../../components/facebookAuth/FacebookAuth';

const LoginSec = (props) => {
  const ANT_LOADING_ICON = (
    <LoadingOutlined style={{ fontSize: 30, color: '#dd2c00' }} spin />
  );

  // Send back successful Google Data to LoginMain
  const handleGoogleData = (data) => {
    props.getGoogleData(data);
  };

  let content = (
    <div className='login-section-container'>
      <div className='login-section-content'>
        <center>
          <p className='login-section-title'>Sign into CodeRoyale</p>
          <GoogleAuth
            text='Login with Google'
            getGoogleData={handleGoogleData}
          />
          <div className='login-auth-separator'></div>
          <FacebookAuth text='Login with Facebook' />
          <p className='login-section-sign-up'>
            Not a member?{' '}
            <Link to='signup' style={{ textDecoration: 'none' }}>
              <span className='span-text'>Sign up now</span>
            </Link>
          </p>
        </center>
      </div>
    </div>
  );

  if (props.isLoading) {
    content = (
      <div className='login-section-container'>
        <div className='login-section-content'>
          <center>
            <p className='login-section-title'>Signing you in...</p>
            <Spin indicator={ANT_LOADING_ICON} />
          </center>
        </div>
      </div>
    );
  }

  return content;
};

export default LoginSec;
