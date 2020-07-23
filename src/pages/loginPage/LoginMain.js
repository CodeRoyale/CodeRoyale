import React, { Component } from 'react';
import './LoginMain.css';
import LeftSection from './leftSection/LeftSection';
import LoginSection from './loginSection/LoginSection';

class LoginMain extends Component {
  render() {
    return (
      <div className='login-page'>
        <LeftSection />
        <LoginSection />
      </div>
    );
  }
}

export default LoginMain;
