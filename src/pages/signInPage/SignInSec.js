import React from 'react';
import GoogleSignIn from '../../components/googleSignIn/GoogleSignIn';
import { Link } from 'react-router-dom';
import './SignInMain.css';

function SignInSec() {
  return (
    <div className='signin-section-container'>
      <div className='signin-section-content'>
        <center>
          <p className='signin-section-title'>Sign into CodeRoyale</p>
          <GoogleSignIn text='Sign in with Google' />
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
}

export default SignInSec;
