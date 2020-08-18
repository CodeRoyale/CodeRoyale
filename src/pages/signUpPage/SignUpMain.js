import React, { useState, useEffect } from 'react';
import './SignUpMain.css';
import LeftSecSignUp from './LeftSecSignUp';
import SignUpSec from './SignUpSec';
import { message } from 'antd';

const SignUpMain = () => {
  const [googleData, setGoogleData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const CLIENT_URL = process.env.REACT_APP_CLIENT_URL;
  const SIGNUP_API = `${process.env.REACT_APP_SERVER_URL}/users/signup`;

  const signUpError = (msg) => {
    message.error(msg);
  };

  const signUpSuccess = (msg) => {
    message.success(msg);
  };

  const handleGoogleData = (data) => {
    setGoogleData(data);
  };

  useEffect(() => {
    // Send to CodeRoyale API for signing up
    if (googleData != null) {
      setIsLoading(true);
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Origin', CLIENT_URL);
      headers.append('Access-Control-Allow-Credentials', 'true');
      // Data to be sent to API
      const thirdPartyData = {
        issuer: 'google',
        signUpType: 'native',
        idToken: googleData.wc.id_token,
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
          setGoogleData(null);
          // Alerts based on response
          if (jsonRes.message === 'User Account Created') {
            signUpSuccess(
              'User account has been created successfully. Please login to use CodeRoyale!'
            );
          } else if (jsonRes.message === 'User Already Exists') {
            signUpError(
              'Sorry, email already exists please sign up with a different email!'
            );
          } else {
            signUpError('Sorry, couldnt sign up. Please try again!');
          }
        })
        .catch((err) => {
          setIsLoading(false);
          setGoogleData(null);
          // Error response from server
          signUpError('Sorry, couldnt sign up. Please try again later!');
        });
    }
  }, [googleData, CLIENT_URL, SIGNUP_API]);

  return (
    <div className='signup-page'>
      <LeftSecSignUp />
      <SignUpSec isLoading={isLoading} getGoogleData={handleGoogleData} />
    </div>
  );
};

export default SignUpMain;
