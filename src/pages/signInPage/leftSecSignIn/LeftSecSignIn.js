import React from 'react';
import './LeftSecSignIn.css';

function LeftSecSignIn() {
  return (
    <div className='left-signin-container'>
      <center>
        <div className='left-signin-content'>
          <p className='left-signin-title'>CodeRoyale</p>
          <p className='left-signin-text'>Compete with the best coders</p>
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
}

export default LeftSecSignIn;
