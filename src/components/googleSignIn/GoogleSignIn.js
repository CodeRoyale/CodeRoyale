import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';

// Google Client ID from .env file
const googleClientID = process.env.REACT_APP_CLIENT_ID;

class GoogleSignIn extends Component {
  // This function is called on successful login from google...
  responseSuccess = (response) => {
    this.props.receiveGoogleData(response);
  };

  render() {
    return (
      <div>
        <GoogleLogin
          clientId={googleClientID}
          buttonText={this.props.text}
          onSuccess={this.responseSuccess}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    );
  }
}

export default GoogleSignIn;
