import React, { useState, useEffect } from 'react';
import LeftSecSignIn from './LeftSecSignIn';
import SignInSec from './SignInSec';
import './SignInMain.css';
import { message } from 'antd';
import 'antd/dist/antd.css';
import { Redirect } from 'react-router';

const SignInMain = () => {
  const [googleData, setGoogleData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const CLIENT_URL = process.env.REACT_APP_CLIENT_URL;
  const SIGNIN_API = `${process.env.REACT_APP_SERVER_URL}/users/login`;

  // Message to user for sign in error
  const signInError = (msg) => {
    message.error(msg);
  };

  // Message to user for sign in success
  const signInSuccess = (msg) => {
    message.success(msg);
  };

  const handleGoogleData = (data) => {
    setGoogleData(data);
  };

  // API call to signin API
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
          setIsLoading(false);
          if (jsonRes.message === 'Login successful') {
            localStorage.setItem('user-data', JSON.stringify(jsonRes));
            localStorage.setItem('access-token', jsonRes.accessToken);
            setIsLoggedIn(true);
            signInSuccess('Welcome back!');
          } else if (jsonRes.message === "User Doesn't Exists") {
            setIsLoggedIn(false);
            signInError(
              'Sorry, you will need to sign up first to use CodeRoyale'
            );
          } else {
            setIsLoggedIn(false);
            signInError("Sorry, couldn't login please try again later!");
          }
        })
        .catch((err) => {
          // Error response from server
          setIsLoggedIn(false);
          signInError("Sorry, couldn't login please try again later!");
        });
    }
  }, [googleData, CLIENT_URL, SIGNIN_API]);

  // Default content
  let content = (
    <div className='signin-page'>
      <LeftSecSignIn />
      <SignInSec isLoading={isLoading} getGoogleData={handleGoogleData} />
    </div>
  );

  // Check if user if logged in
  if (isLoggedIn) {
    content = <Redirect to='/dashboard' />;
  }

  return content;
};

export default SignInMain;
