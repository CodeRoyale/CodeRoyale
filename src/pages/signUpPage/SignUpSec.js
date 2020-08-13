import React, { useState, useEffect } from 'react';
import GoogleSignIn from '../../components/googleSignIn/GoogleSignIn';
import { Link, Redirect } from 'react-router-dom';
import { message, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './SignUpMain.css';

const CLIENT_URL = process.env.REACT_APP_CLIENT_URL;
const SIGNUP_API = process.env.REACT_APP_SIGNUP_API;
const ANT_ICON = (
  <LoadingOutlined style={{ fontSize: 30, color: '#dd2c00' }} spin />
);

const SignUpSec = () => {
  const accessToken = localStorage.getItem('access-token');
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [googleData, setGoogleData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  if (accessToken != null) {
    setIsSignedUp(true);
  }

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
            setIsSignedUp(true);
            signUpSuccess(
              'User account has been created successfully. Please login to use CodeRoyale!'
            );
          } else if (jsonRes.message === 'User Already Exists') {
            setIsSignedUp(false);
            signUpError(
              'Sorry, email already exists please sign up with a different email!'
            );
          } else {
            setIsSignedUp(false);
            signUpError('Sorry, couldnt sign up. Please try again!');
          }
        })
        .catch((err) => {
          setIsLoading(false);
          setGoogleData(null);
          setIsSignedUp(false);
          // Error response from server
          signUpError('Sorry, couldnt sign up. Please try again later!');
        });
    }
  }, [googleData]);

  let content = (
    <div className='signup-section-container'>
      <div className='signup-section-content'>
        <center>
          <p className='signup-section-title'>Sign up for CodeRoyale</p>
          <GoogleSignIn
            text='Sign up with Google'
            sendGoogleData={handleGoogleData}
          />
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

  if (isSignedUp) {
    return <Redirect to='/dashboard' />;
  }

  if (isLoading) {
    content = (
      <div className='signup-section-container'>
        <div className='signup-section-content'>
          <center>
            <p className='signup-section-title'>Sign up for CodeRoyale</p>
            <GoogleSignIn
              text='Sign up with Google'
              sendGoogleData={handleGoogleData}
            />
            <p className='signup-section-sign-up'>
              Already a member?{' '}
              <Link to='/signin' style={{ textDecoration: 'none' }}>
                <span className='span-text'>Sign in now</span>
              </Link>
            </p>
            <Spin indicator={ANT_ICON} />
          </center>
        </div>
      </div>
    );
  }
  return content;
};

export default SignUpSec;
