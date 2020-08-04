import React from 'react';
import './SignUpMain.css';

function LeftSecSignUp() {
  return (
    <div data-testid='left-signup-container' className='left-signup-container'>
      <center>
        <div data-testid='left-signup-content' className='left-signup-content'>
          <p data-testid='left-signup-title' className='left-signup-title'>
            CodeRoyale
          </p>
          <p data-testid='left-signup-text' className='left-signup-text'>
            Compete with the best coders
          </p>
          <img
            alt='login'
            src='/images/signup.svg'
            width='350px'
            height='350px'
          />
        </div>
      </center>
    </div>
  );
}

export default LeftSecSignUp;
