/*
    Signin button for the project...
*/

import React from 'react';
import './SigninButton.css';

function Button({ text, href }) {
  return (
    <div>
      <a className='main-button' href={href}>
        {text}
      </a>
    </div>
  );
}

export default Button;
