import React, { useState, useEffect } from 'react';
import GoogleSignIn from '../../components/googleSignIn/GoogleSignIn';
import { Link, Redirect } from 'react-router-dom';
import { message, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './SignInMain.css';

const CLIENT_URL = process.env.REACT_APP_CLIENT_URL;
const SIGNIN_API = process.env.REACT_APP_SIGNIN_API;
const ANT_LOADING_ICON = (
  <LoadingOutlined style={{ fontSize: 30, color: '#dd2c00' }} spin />
);

const SignInSec = () => {
  const accessToken = localStorage.getItem('access-token');
  const [googleData, setGoogleData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (accessToken != null) {
    setIsLoggedIn(true);
  }

  const signInError = (msg) => {
    message.error(msg);
  };

  const signInSuccess = (msg) => {
    message.success(msg);
  };

  const handleGoogleData = (data) => {
    setGoogleData(data);
  };

  useEffect(() => {
    if (googleData != null) {
      setIsLoading(true);
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Origin', CLIENT_URL);
      headers.append('Access-Control-Allow-Credentials', 'true');
      // Data to be sent to API
      const thirdPartyData = {
        issuer: 'google',
        idToken: googleData.wc.id_token,
      };
      fetch(SIGNIN_API, {
        method: 'POST',
        headers,
        body: JSON.stringify(thirdPartyData),
      })
        .then((res) => res.json())
        .then((jsonRes) => {
          // Success response from server
          if (jsonRes.message === 'Login successful') {
            setIsLoading(false);
            setGoogleData(null);
            setIsLoggedIn(true);
            signInSuccess('Welcome back!');
            localStorage.setItem('user-data', JSON.stringify(jsonRes));
            localStorage.setItem('access-token', jsonRes.accessToken);
          } else if (jsonRes.message === "User Doesn't Exists") {
            setIsLoading(false);
            setGoogleData(null);
            setIsLoggedIn(false);
            signInError(
              'Sorry, you will need to sign up first to use CodeRoyale'
            );
          } else {
            setIsLoading(false);
            setGoogleData(null);
            setIsLoggedIn(false);
            signInError("Sorry, couldn't login please try again later!");
          }
        })
        .catch((err) => {
          // Error response from server
          setIsLoading(false);
          setGoogleData(null);
          // TODO: Show alerts based on error response
          signInError("Sorry, couldn't login please try again later!");
        });
    }
  }, [googleData]);

  let content = (
    <div className='signin-section-container'>
      <div className='signin-section-content'>
        <center>
          <p className='signin-section-title'>Sign into CodeRoyale</p>
          <GoogleSignIn
            text='Sign in with Google'
            sendGoogleData={handleGoogleData}
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

  if (isLoggedIn) {
    content = <Redirect to='/dashboard' />;
  }

  if (isLoading) {
    content = (
      <div className='signin-section-container'>
        <div className='signin-section-content'>
          <center>
            <p className='signin-section-title'>Sign into CodeRoyale</p>
            <GoogleSignIn
              text='Sign in with Google'
              sendGoogleData={handleGoogleData}
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
