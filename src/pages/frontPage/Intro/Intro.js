import React from 'react';
import AuthButton from '../../../components/authButton/AuthButton';
import './Intro.css';

function Intro() {
  return (
    <div className='intro-container'>
      <div className='intro-text-container'>
        <p className='intro-heading'>Compete with other coders</p>
        <p className='intro-text'>
          Challenge your friends to a coding match or play <br /> against random
          coders from around the globe.
        </p>
        <div className='intro-signin'>
          <AuthButton text='Sign in' />
        </div>
      </div>
      <div className='intro-separator'></div>
      <img
        className='intro-image'
        alt='coder programming'
        src='/images/programming.svg'
      />
    </div>
  );
}

export default Intro;
