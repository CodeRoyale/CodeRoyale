import React from 'react';
import './LoginMain.css';

const LeftSecLogin = () => {
  return (
    <div className='left-login-container'>
      <div className='left-login-content'>
        <img
          className='left-login-image'
          alt='login'
          src='/images/login.svg'
          width='400px'
          height='400px'
        />
      </div>
    </div>
  );
};

export default LeftSecLogin;
