import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader, Input } from 'rsuite';
import Button from '../../components/button/Button';
import GoogleAuth from '../../components/googleAuth/GoogleAuth';
import FacebookAuth from '../../components/facebookAuth/FacebookAuth';
import LogoContainer from '../../components/logoContainer/LogoContainer';
import './SignUpMain.css';

const SignUpSec = (props) => {
  const [passwordReq, setPasswordReq] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordRec, setPasswordRec] = useState(false);
  const [signUpData, setSignUpData] = useState({});

  // Send back successful auth data to SignUpMain
  const handleAuthData = (data) => {
    setSignUpData(data);
    setPasswordReq(true);
  };

  useEffect(() => {
    if (passwordRec) {
      props.getAuthData(signUpData);
      setPasswordRec(false);
      setPasswordReq(false);
    }
  }, [passwordReq, passwordRec, props, signUpData]);

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

  if (passwordReq) {
    content = (
      <div className='signup-section-container'>
        <Input
          style={{ width: 300 }}
          placeholder='Password'
          value={password}
          type='password'
          onChange={(value) => setPassword(value)}
        />
        <div className='signup-section-password-btn'>
          <Button
            type='button'
            buttonStyle='btn--primary--normal'
            buttonSize='btn--medium'
            onClick={() => {
              setSignUpData({ ...signUpData, password: password });
              setPasswordRec(true);
            }}
          >
            Sign up
          </Button>
        </div>
      </div>
    );
  }

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
