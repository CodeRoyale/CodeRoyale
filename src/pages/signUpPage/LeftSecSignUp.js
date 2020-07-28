import React from 'react';
import './SignUpMain.css';

function LeftSecSignUp() {
  return (
    <div className='left-signup-container'>
      <center>
        <div className='left-signup-content'>
          <p className='left-signup-title'>CodeRoyale</p>
          <p className='left-signup-text'>Compete with the best coders</p>
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
