import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';

class GoogleSignIn extends Component {
  // Google Client ID from .env file
  googleClientID = process.env.REACT_APP_CLIENT_ID;

  // This function is called on successful login from google...
  responseSuccess = (response) => {
    console.log(response);
    console.log(response.profileObj);
  };

  render() {
    return (
      <div>
        <GoogleLogin
          clientId={this.googleClientID}
          buttonText={this.props.text}
          onSuccess={this.responseSuccess}
          onFailure={this.responseFailure}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    );
  }
}

export default GoogleSignIn;
