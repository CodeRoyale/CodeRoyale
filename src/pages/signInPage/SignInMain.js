import React, { Component } from 'react';
import LeftSecSignIn from './LeftSecSignIn';
import SignInSec from './SignInSec';
import './SignInMain.css';

class SignInPage extends Component {
  render() {
    return (
      <div data-textid='signin-page' className='signin-page'>
        <LeftSecSignIn />
        <SignInSec />
      </div>
    );
  }
}

export default SignInPage;
