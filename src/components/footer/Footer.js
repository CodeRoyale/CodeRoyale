/* 
    For the footer of website
*/

import React from 'react';
import emoji from 'react-easy-emoji';
import './Footer.css';

function Footer() {
  return (
    <div className='footer-container'>
      <p>
        Made with <span>{emoji('❤️')}</span> in <span>{emoji('🇮🇳')}</span>
      </p>
    </div>
  );
}

export default Footer;
