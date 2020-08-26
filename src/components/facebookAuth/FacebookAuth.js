import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { FacebookFilled } from '@ant-design/icons';
import './FacebookAuth.css';

const FacebookAuth = (props) => {
  // Facebook app ID from .env file
  const facebookAppID = process.env.REACT_APP_APP_ID;
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
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className='facebook-custom-button'
          >
            <FacebookFilled className='facebook-icon' /> {props.text}
          </button>
        )}
      />
    </div>
  );
};

export default FacebookAuth;
