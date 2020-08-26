import React from 'react';
import { Link } from 'react-router-dom';
import './LoginMain.css';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import GoogleAuth from '../../components/googleAuth/GoogleAuth';
import FacebookAuth from '../../components/facebookAuth/FacebookAuth';
import LogoContainer from '../../components/logoContainer/LogoContainer';

const LoginSec = (props) => {
  const ANT_LOADING_ICON = (
    <LoadingOutlined style={{ fontSize: 30, color: '#dd2c00' }} spin />
  );

  // Send back successful auth data to LoginMain
  const handleAuthData = (data) => {
    props.getAuthData(data);
  };

  let content = (
    <div className='login-section-container'>
      <div className='login-section-title'>
        Sign into <LogoContainer />{' '}
      </div>
      <div>
        <div className='login-auth-separator'></div>
        <GoogleAuth text='Login with Google' getAuthData={handleAuthData} />
        <div className='login-auth-separator'></div>
        <FacebookAuth text='Login with Facebook' getAuthData={handleAuthData} />
        <p className='login-section-sign-up'>
          Not a member?{' '}
          <Link to='signup' style={{ textDecoration: 'none' }}>
            <span className='span-text'>Sign up now</span>
          </Link>
        </p>
      </div>
    </div>
  );

  if (props.isLoading) {
    content = (
      <div className='login-section-container'>
        <p className='login-section-title'>Signing you in...</p>
        <div className='login-auth-separator'></div>
        <Spin indicator={ANT_LOADING_ICON} />
      </div>
    );
  }

  return content;
};

export default LoginSec;
