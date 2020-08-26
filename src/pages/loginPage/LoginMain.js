import React, { useState, useEffect } from 'react';
import LeftSecLogin from './LeftSecLogin';
import LoginSec from './LoginSec';
import './LoginMain.css';
import { message } from 'antd';
import { Redirect } from 'react-router';
import { LOGIN_SUCCESS, LOGIN_USER_DOESNT_EXIST } from '../../utils/constants';

const LoginMain = () => {
  const [authData, setAuthData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const CLIENT_URL = process.env.REACT_APP_CLIENT_URL;
  const LOGIN_API = `${process.env.REACT_APP_SERVER_URL}/users/login`;

  // Message to user for login error
  const loginError = (msg) => {
    message.error(msg);
  };

  // Message to user for login success
  const loginSuccess = (msg) => {
    message.success(msg);
  };

  const handleAuthData = (data) => {
    setAuthData(data);
  };

  // API call to login API
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
        idToken: authData.access_token,
      };
      fetch(LOGIN_API, {
        method: 'POST',
        headers,
        body: JSON.stringify(thirdPartyData),
      })
        .then((res) => res.json())
        .then((jsonRes) => {
          // Success response from server
          setIsLoading(false);
          if (jsonRes.message === LOGIN_SUCCESS) {
            localStorage.setItem('user-data', JSON.stringify(jsonRes));
            localStorage.setItem('access-token', jsonRes.accessToken);
            setIsLoggedIn(true);
            loginSuccess('Welcome back!');
          } else if (jsonRes.message === LOGIN_USER_DOESNT_EXIST) {
            setIsLoggedIn(false);
            loginError(
              'Sorry, you will need to sign up first to use CodeRoyale'
            );
          } else {
            setIsLoggedIn(false);
            loginError("Sorry, couldn't login please try again later!");
          }
        })
        .catch((err) => {
          // Error response from server
          setIsLoggedIn(false);
          loginError("Sorry, couldn't login please try again later!");
        });
    }
  }, [authData, CLIENT_URL, LOGIN_API]);

  // Default content
  let content = (
    <div className='login-page'>
      <LeftSecLogin />
      <LoginSec isLoading={isLoading} getAuthData={handleAuthData} />
    </div>
  );

  // Check if user if logged in
  if (isLoggedIn) {
    content = <Redirect to='/dashboard' />;
  }

  return content;
};

export default LoginMain;
