import React, { Component } from 'react';
import './SignUpMain.css';
import LeftSecSignUp from './leftSecSignUp/leftSecSignUp';
import SignUpSec from './signUpSec/SignUpSec';

class SignUpMain extends Component {
  render() {
    return (
      <div className='signup-page'>
        <LeftSecSignUp />
        <SignUpSec />
      </div>
    );
  }
}

export default SignUpMain;
