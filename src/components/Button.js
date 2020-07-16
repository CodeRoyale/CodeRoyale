/*
    For buttons in the project...
*/

import React from 'react';

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
