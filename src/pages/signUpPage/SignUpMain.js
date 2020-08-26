import React, { useState, useEffect } from 'react';
import './SignUpMain.css';
import LeftSecSignUp from './LeftSecSignUp';
import SignUpSec from './SignUpSec';
import { message } from 'antd';
import { Redirect } from 'react-router';
import { SIGNUP_SUCCESS, SIGNUP_USER_EXISTS } from '../../utils/constants';

const SignUpMain = () => {
  const [authData, setAuthData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const CLIENT_URL = process.env.REACT_APP_CLIENT_URL;
  const SIGNUP_API = `${process.env.REACT_APP_USER_API_URL}/users/signup`;

  // Message to user for signup error
  const signUpError = (msg) => {
    message.error(msg);
  };

  // Message to user for signup successs
  const signUpSuccess = (msg) => {
    message.success(msg);
  };

  const handleAuthData = (data) => {
    setAuthData(data);
  };

  // API call to signup API
  useEffect(() => {
    if (authData != null) {
      setIsLoading(true);
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Origin', CLIENT_URL);
      headers.append('Access-Control-Allow-Credentials', 'true');
      // Data to be sent to API
      const thirdPartyData = {
        issuer: authData.issuer,
        signUpType: authData.signUpType,
        access_token: authData.access_token,
      };
      fetch(SIGNUP_API, {
        method: 'POST',
        headers,
        body: JSON.stringify(thirdPartyData),
      })
        .then((res) => res.json())
        .then((jsonRes) => {
          // Success response from server
          setIsLoading(false);
          // Alerts based on response
          if (jsonRes.message === SIGNUP_SUCCESS) {
            signUpSuccess(
              'User account has been created successfully. Please login to use CodeRoyale!'
            );
            setIsSignedUp(true);
          } else if (jsonRes.message === SIGNUP_USER_EXISTS) {
            signUpError(
              'Sorry, email already exists please sign up with a different email!'
            );
            setIsSignedUp(false);
          } else {
            signUpError('Sorry, couldnt sign up. Please try again!');
            setIsSignedUp(false);
          }
        })
        .catch((err) => {
          setIsLoading(false);
          setIsSignedUp(false);
          // Error response from server
          signUpError('Sorry, couldnt sign up. Please try again later!');
        });
    }
  }, [authData, CLIENT_URL, SIGNUP_API]);

  // Default content
  let content = (
    <div className='signup-page'>
      <LeftSecSignUp />
      <SignUpSec isLoading={isLoading} getAuthData={handleAuthData} />
    </div>
  );

  if (isSignedUp) {
    content = <Redirect to='/' />;
  }
  return content;
};

export default SignUpMain;
