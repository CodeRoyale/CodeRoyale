import React from 'react';
import AuthButton from '../../../components/authButton/AuthButton';
import './Description.css';

function Description() {
  return (
    <div className='desc-container'>
      <div className='desc-text-container'>
        <p className='desc-heading'>Compete with other coders</p>
        <p className='desc-text'>
          Challenge your friends to a coding match or play <br /> against random
          coders from around the globe.
        </p>
        <div className='desc-signin'>
          <AuthButton text='Sign in' to='/login' />
        </div>
      </div>
      <div className='desc-separator'></div>
      <img
        className='desc-image'
        alt='coder programming'
        src='/images/programming.svg'
      />
    </div>
  );
}

export default Description;
