import React from 'react';
import './LoginMain.css';

const LeftSecLogin = () => {
  return (
    <div className='left-login-container'>
      <center>
        <div className='left-login-content'>
          <p className='left-login-title'>CodeRoyale</p>
          <p className='left-login-text'>Compete with the best coders</p>
          <img
            alt='login'
            src='/images/login.svg'
            width='400px'
            height='400px'
          />
        </div>
      </center>
    </div>
  );
};

export default LeftSecLogin;
