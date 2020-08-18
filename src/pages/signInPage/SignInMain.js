import React, { useState, useEffect } from 'react';
import LeftSecSignIn from './LeftSecSignIn';
import SignInSec from './SignInSec';
import './SignInMain.css';
import { message } from 'antd';
import 'antd/dist/antd.css';
import { Redirect } from 'react-router';

const SignInMain = () => {
  const [googleData, setGoogleData] = useState(null);
  const CLIENT_URL = process.env.REACT_APP_CLIENT_URL;
  const SIGNIN_API = `${process.env.REACT_APP_SERVER_URL}/users/login`;
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
            signInSuccess('Welcome back!');
            setIsLoggedIn(true);
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
          setIsLoggedIn(false);
          signInError("Sorry, couldn't login please try again later!");
        });
    }
  }, [googleData, CLIENT_URL, SIGNIN_API]);

  let content = (
    <div className='signin-page'>
      <LeftSecSignIn />
      <SignInSec isLoading={isLoading} getGoogleData={handleGoogleData} />
    </div>
  );

  if (isLoggedIn) {
    content = <Redirect to='/sorry' />;
  }

  return content;
};

export default SignInMain;
