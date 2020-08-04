import React from 'react';
import './SignInMain.css';

function LeftSecSignIn() {
  return (
    <div data-test='left-signin-container' className='left-signin-container'>
      <center>
        <div data-test='left-signin-content' className='left-signin-content'>
          <p data-test='left-signin-title' className='left-signin-title'>
            CodeRoyale
          </p>
          <p data-test='left-signin-text' className='left-signin-text'>
            Compete with the best coders
          </p>
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
