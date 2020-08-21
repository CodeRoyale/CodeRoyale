import React from 'react';
import GoogleLogin from 'react-google-login';
import { GoogleCircleFilled } from '@ant-design/icons';
import './GoogleAuth.css';

const GoogleAuth = (props) => {
  // Google Client ID from .env file
  const googleClientID = process.env.REACT_APP_CLIENT_ID;

  // This function is called on successful login from google...
  const responseSuccess = (response) => {
    // Send back data to called function
    props.getGoogleData(response);
  };

  return (
    <div>
      <GoogleLogin
        clientId={googleClientID}
        onSuccess={responseSuccess}
        cookiePolicy={'single_host_origin'}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className='google-custom-button'
          >
            <GoogleCircleFilled className='google-icon' /> {props.text}
          </button>
        )}
      />
    </div>
  );
};

export default GoogleAuth;
