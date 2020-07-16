/* 
    For the intro in the front page
*/

import React from 'react';
import Button from './Button';
import emoji from 'react-easy-emoji';
import Coder from '../../assets/images/coding.svg';

function Intro() {
  return (
    <div className='intro-container'>
      <div className='intro-text'>
        <h1 className='intro-text-heading'>
          What is CodeRoyale? <span>{emoji('👨‍💻')}</span>
        </h1>
        <h3 className='intro-text-content'>
          CodeRoyale is fun blah blah blah blah blah fun blah blah blah blah
          blah fun blah blah blah blah blah fun blah blah{' '}
        </h3>
        <Button text='Get Started' href='#' />
      </div>
      <div className='intro-separator' />
      <img className='intro-image' alt='coder concentrating' src={Coder} />
    </div>
  );
}

export default Intro;
