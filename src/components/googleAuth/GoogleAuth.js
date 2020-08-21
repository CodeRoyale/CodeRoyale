import React from 'react';
import GoogleLogin from 'react-google-login';

const GoogleAuth = (props) => {
  // Google Client ID from .env file
  const googleClientID = process.env.REACT_APP_CLIENT_ID;

  // This function is called on successful login from google...
  const responseSuccess = (response) => {
    // Send data to SignUpSec.js props
    props.getGoogleData(response);
  };

  return (
    <div>
      <GoogleLogin
        clientId={googleClientID}
        buttonText={props.text}
        onSuccess={responseSuccess}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default GoogleAuth;
