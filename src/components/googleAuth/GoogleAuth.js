import React from 'react';
import GoogleLogin from 'react-google-login';
import { Icon } from 'rsuite';
import './GoogleAuth.css';

const GoogleAuth = (props) => {
  // Google Client ID from .env file
  const googleClientID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  // This function is called on successful auth from google...
  const responseSuccess = (response) => {
    const authData = {
      access_token: response.wc.id_token,
      issuer: 'google',
      signUpType: 'OAuth',
    };
    // Send back data to called function
    props.getAuthData(authData);
  };

  return (
    <div>
      <GoogleLogin
        clientId={googleClientID}
        onSuccess={responseSuccess}
        cookiePolicy={'single_host_origin'}
        render={(renderProps) => (
          <div
            className='google-custom-button'
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <Icon icon='google' size='2x' />
            &nbsp; &nbsp;
            {props.text}
          </div>
        )}
      />
    </div>
  );
};

export default GoogleAuth;
