import React from 'react';
import GoogleSignIn from '../../../components/googleSignIn/GoogleSignIn';
import './SignUpSec.css';

function SignUpSec() {
  return (
    <div className='signup-section-container'>
      <div className='signup-section-content'>
        <center>
          <p className='signup-section-title'>Sign up for CodeRoyale</p>
          <GoogleSignIn text='Sign up with Google' />
          <p className='signup-section-sign-up'>
            Already a member? <span className='span-text'>Sign in now</span>
          </p>
        </center>
      </div>
    </div>
  );
}

export default SignUpSec;
