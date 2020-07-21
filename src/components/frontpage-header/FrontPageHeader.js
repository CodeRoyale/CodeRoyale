import React from 'react';
import AuthButton from '../authButton/AuthButton';
import './FrontPageHeader.css';

function FrontPageHeader() {
  return (
    <div className='frontpage-header'>
      <h2 className='coderoyale-title'>CodeRoyale</h2>
      <div className='frontpage-header-links'>
        <ul>
          <li>
            Play
            <div className='play-menu'>
              <div className='play-menu-options'>
                <div className='play-item-with-friend'>
                  <img
                    alt='programming'
                    src='images/friends.svg'
                    width='150px'
                    height='150px'
                  />
                  <h4>Play with a friend</h4>
                  <p>Challenge a friend to a 1v1 coding competition.</p>
                </div>
                <div className='play-item-with-random'>
                  <img
                    alt='programming'
                    src='images/random.svg'
                    width='150px'
                    height='150px'
                  />
                  <h4>Play with a random coder</h4>
                  <p>Compete with a random coder from around the globe.</p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <AuthButton text='Sign in' />
    </div>
  );
}

export default FrontPageHeader;
