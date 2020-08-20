import React from 'react';
import GoogleSignIn from '../../components/googleSignIn/GoogleSignIn';
import { Link } from 'react-router-dom';
import './SignUpMain.css';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

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
          <p className='signup-section-title'>Sign up for CodeRoyale</p>
          <GoogleSignIn
            text='Sign up with Google'
            getGoogleData={handleGoogleData}
          />
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
            <p className='signup-section-title'>Sign up for CodeRoyale</p>
            <GoogleSignIn
              text='Sign up with Google'
              getGoogleData={handleGoogleData}
            />
            <p className='signup-section-sign-up'>
              Already a member?{' '}
              <Link to='/signin' style={{ textDecoration: 'none' }}>
                <span className='span-text'>Sign in now</span>
              </Link>
            </p>
            <Spin indicator={ANT_LOADING_ICON} />
          </center>
        </div>
      </div>
    );
  }

  return content;
};

export default SignUpSec;
