import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { Icon } from '@chakra-ui/react';
import { AiFillFacebook } from 'react-icons/ai';
import './FacebookAuth.scss';

const FacebookAuth = ({ getAuthData, text }) => {
  // Facebook app ID from .env file
  const facebookAppID = process.env.REACT_APP_FACEBOOK_APP_ID;

  // Successful auth from facebook...
  const responseSuccess = (response) => {
    const authData = {
      access_token: response.accessToken,
      issuer: 'facebook',
      signUpType: 'OAuth',
    };
    getAuthData(authData);
  };

  return (
    <div>
      <FacebookLogin
        appId={facebookAppID}
        fields='name,email,picture'
        callback={responseSuccess}
        render={(renderProps) => (
          <div
            className='facebook-custom-button'
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            aria-hidden='true'
          >
            <Icon as={AiFillFacebook} w={6} h={6} />
            &nbsp; &nbsp;
            {text}
          </div>
        )}
      />
    </div>
  );
};

export default FacebookAuth;
