import React, { Component } from 'react';
import './SignUpMain.css';
import LeftSecSignUp from './LeftSecSignUp';
import SignUpSec from './SignUpSec';

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
