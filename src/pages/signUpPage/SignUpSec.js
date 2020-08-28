import React from 'react';
import { Link } from 'react-router-dom';
import './SignUpMain.css';
import { Loader } from 'rsuite';
import GoogleAuth from '../../components/googleAuth/GoogleAuth';
import FacebookAuth from '../../components/facebookAuth/FacebookAuth';
import LogoContainer from '../../components/logoContainer/LogoContainer';

const SignUpSec = (props) => {
  // Send back successful auth data to SignUpMain
  const handleAuthData = (data) => {
    props.getAuthData(data);
  };

  let content = (
    <div className='signup-section-container'>
      <div className='signup-section-title'>
        Sign up for <LogoContainer />{' '}
      </div>
      <div>
        <div className='signup-auth-separator'></div>
        <GoogleAuth text='Sign up with Google' getAuthData={handleAuthData} />
        <div className='signup-auth-separator'></div>
        <FacebookAuth
          text='Sign up with Facebook'
          getAuthData={handleAuthData}
        />
        <p className='signup-section-sign-up'>
          Already a member?{' '}
          <Link to='/login' style={{ textDecoration: 'none' }}>
            <span className='span-text'>Login now</span>
          </Link>
        </p>
      </div>
    </div>
  );

  if (props.isLoading) {
    content = (
      <div className='signup-section-container'>
        <Loader size='md' content='Signing you up...' />
      </div>
    );
  }

  return content;
};

export default SignUpSec;
