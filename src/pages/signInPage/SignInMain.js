import React, { Component } from 'react';
import LeftSecSignIn from './leftSecSignIn/LeftSecSignIn';
import SignInSec from './signInSec/SignInSec';
import './SignInMain.css';

class SignInPage extends Component {
  render() {
    return (
      <div className='signin-page'>
        <LeftSecSignIn />
        <SignInSec />
      </div>
    );
  }
}

export default SignInPage;
