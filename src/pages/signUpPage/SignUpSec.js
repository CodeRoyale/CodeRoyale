import React from 'react';
import GoogleSignIn from '../../components/googleSignIn/GoogleSignIn';
import { Link } from 'react-router-dom';
import './SignUpMain.css';

function SignUpSec() {
  return (
    <div className='signup-section-container'>
      <div className='signup-section-content'>
        <center>
          <p className='signup-section-title'>Sign up for CodeRoyale</p>
          <GoogleSignIn text='Sign up with Google' />
          <p className='signup-section-sign-up'>
            Already a member?{' '}
            <Link to='/signin' style={{ textDecoration: 'none' }}>
              <span className='span-text'>Sign in now</span>
            </Link>
          </p>
        </center>
      </div>
    </div>
  );
}

export default SignUpSec;
