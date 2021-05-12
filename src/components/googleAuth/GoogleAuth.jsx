import React from 'react';
import GoogleLogin from 'react-google-login';
import { Icon } from '@chakra-ui/react';
import { AiOutlineGoogle } from 'react-icons/ai';
import './GoogleAuth.scss';

const GoogleAuth = ({ getAuthData, text }) => {
  // Google Client ID from .env file
  const googleClientID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  // This function is called on successful auth from google...
  const responseSuccess = (response) => {
    const authData = {
      access_token: response.tokenObj.id_token,
      issuer: 'google',
      signUpType: 'OAuth',
    };
    // Send back data to called function
    getAuthData(authData);
  };

  return (
    <div>
      <GoogleLogin
        clientId={googleClientID}
        onSuccess={responseSuccess}
        cookiePolicy='single_host_origin'
        render={(renderProps) => (
          <div
            className='google-custom-button'
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            aria-hidden='true'
          >
            <Icon as={AiOutlineGoogle} w={6} h={6} />
            &nbsp; &nbsp;
            {text}
          </div>
        )}
      />
    </div>
  );
};

export default GoogleAuth;
