import React from 'react';
import GoogleSignIn from '../../components/googleSignIn/GoogleSignIn';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import './SignInMain.css';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const SignInSec = (props) => {
  const ANT_LOADING_ICON = (
    <LoadingOutlined style={{ fontSize: 30, color: '#dd2c00' }} spin />
  );

  // Send back successful Google Data to SignInMain
  const handleGoogleData = (data) => {
    props.getGoogleData(data);
  };

  let content = (
    <div className='signin-section-container'>
      <div className='signin-section-content'>
        <center>
          <p className='signin-section-title'>Sign into CodeRoyale</p>
          <GoogleSignIn
            text='Sign in with Google'
            getGoogleData={handleGoogleData}
          />
          <p className='signin-section-sign-up'>
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
      <div className='signin-section-container'>
        <div className='signin-section-content'>
          <center>
            <p className='signin-section-title'>Sign into CodeRoyale</p>
            <GoogleSignIn
              text='Sign in with Google'
              getGoogleData={handleGoogleData}
            />
            <p className='signin-section-sign-up'>
              Not a member?{' '}
              <Link to='signup' style={{ textDecoration: 'none' }}>
                <span className='span-text'>Sign up now</span>
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

export default SignInSec;
