import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import './FacebookAuth.css';
import { Icon } from 'rsuite';

const FacebookAuth = (props) => {
  // Facebook app ID from .env file
  const facebookAppID = process.env.REACT_APP_FACEBOOK_APP_ID;
  // Successful auth from facebook...
  const responseSuccess = (response) => {
    const authData = {
      access_token: response.accessToken,
      issuer: 'facebook',
      signUpType: 'OAuth',
    };
    props.getAuthData(authData);
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
          >
            <Icon icon='facebook-official' size='2x' />
            &nbsp; &nbsp;
            {props.text}
          </div>
        )}
      />
    </div>
  );
};

export default FacebookAuth;
