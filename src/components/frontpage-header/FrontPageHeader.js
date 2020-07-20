import React from 'react';
import AuthButton from '../authButton/AuthButton';
import './FrontPageHeader.css';

function FrontPageHeader() {
  return (
    <div className='frontpage-header'>
      <h2 className='coderoyale-title'>CodeRoyale</h2>
      <div className='frontpage-header-links'>
        <p>Play</p>
      </div>
      <AuthButton text='Sign in' />
    </div>
  );
}

export default FrontPageHeader;
