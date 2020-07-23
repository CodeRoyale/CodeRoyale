import React from 'react';
import './LeftSection.css';

function LeftSection() {
  return (
    <div className='left-section-container'>
      <center>
        <div className='left-section-content'>
          <p className='left-section-title'>CodeRoyale</p>
          <p className='left-section-text'>Compete with the best coders</p>
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

export default LeftSection;
