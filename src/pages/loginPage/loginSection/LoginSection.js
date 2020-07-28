import React from 'react';
import GoogleSignIn from '../../../components/googleSignIn/GoogleSignIn';
import './LoginSection.css';

function LoginSection() {
  return (
    <div className='login-section-container'>
      <div className='login-section-content'>
        <center>
          <p className='login-section-title'>Sign into CodeRoyale</p>
          <GoogleSignIn text='Sign in with Google' />
          <p className='login-section-sign-up'>
            Not a member? <span className='span-text'>Sign up now</span>
          </p>
        </center>
      </div>
    </div>
  );
}

export default LoginSection;
