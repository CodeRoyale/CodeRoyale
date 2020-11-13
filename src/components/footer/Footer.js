import React from 'react';
import { Icon } from 'rsuite';
import './Footer.css';

const Footer = () => {
  return (
    <div className='footer-container'>
      <center>
        <div className='footer-social-section'>
          <nav>
            <ul className='footer-social'>
              <li>
                <a href='https://www.google.com/'>
                  <Icon icon='twitter' size='2x' />
                </a>
              </li>
              <li>
                <a href='https://www.google.com/'>
                  <Icon icon='linkedin-square' size='2x' />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </center>
      <center>
        <div className='footer-links-section'>
          <nav>
            <ul className='footer-links'>
              <li>
                <a href='https://www.google.com/'>Terms of service</a>
              </li>
              <li>
                <a href='https://www.google.com/'>Our team</a>
              </li>
              <li>
                <a href='https://www.google.com/'>Kuch bhi cheez</a>
              </li>
            </ul>
          </nav>
        </div>
      </center>
      <p className='footer-made-with'>
        Made with{' '}
        <span role='img' aria-label='love'>
          ❤️
        </span>{' '}
        from{' '}
        <span role='img' aria-label='india'>
          🇮🇳
        </span>
      </p>
    </div>
  );
};

export default Footer;
