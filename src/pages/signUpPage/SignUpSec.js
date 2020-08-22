import React from 'react';
import { Link } from 'react-router-dom';
import './SignUpMain.css';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import GoogleAuth from '../../components/googleAuth/GoogleAuth';
import FacebookAuth from '../../components/facebookAuth/FacebookAuth';
import LogoContainer from '../../components/logoContainer/LogoContainer';

const SignUpSec = (props) => {
  const ANT_LOADING_ICON = (
    <LoadingOutlined style={{ fontSize: 30, color: '#dd2c00' }} spin />
  );

  // Send back successful Google Data to SignUpMain
  const handleGoogleData = (data) => {
    props.getGoogleData(data);
  };

  let content = (
    <div className='signup-section-container'>
      <div className='signup-section-content'>
        <center>
          <p className='signup-section-title'>
            Sign up for <LogoContainer />{' '}
          </p>
          <GoogleAuth
            text='Sign up with Google'
            getGoogleData={handleGoogleData}
          />
          <div className='signup-auth-separator'></div>
          <FacebookAuth text='Sign up with Facebook' />
          <p className='signup-section-sign-up'>
            Already a member?{' '}
            <Link to='/login' style={{ textDecoration: 'none' }}>
              <span className='span-text'>Login now</span>
            </Link>
          </p>
        </center>
      </div>
    </div>
  );

  if (props.isLoading) {
    content = (
      <div className='signup-section-container'>
        <div className='signup-section-content'>
          <center>
            <p className='signup-section-title'>Signing you up...</p>
            <Spin indicator={ANT_LOADING_ICON} />
          </center>
        </div>
      </div>
    );
  }

  return content;
};

export default SignUpSec;
