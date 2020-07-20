/*
    Auth button for the project...
*/

import React from 'react';
import './AuthButton.css';

function AuthButton({ text, href }) {
  return (
    <div>
      <a className='auth-button' href={href}>
        {text}
      </a>
    </div>
  );
}

export default AuthButton;
