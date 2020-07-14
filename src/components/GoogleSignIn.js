import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';

class GoogleSignIn extends Component {
  // This function is called on successful login from google...
  responseSuccess = (response) => {
    console.log(response);
    console.log(response.profileObj);
  };

  render() {
    return (
      <div>
        <GoogleLogin
          clientId='1011215903549-gk04pquqgtbkkeft8rvked0eb08lks61.apps.googleusercontent.com'
          buttonText='Login with Google'
          onSuccess={this.responseSuccess}
          onFailure={this.responseFailure}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    );
  }
}

export default GoogleSignIn;
