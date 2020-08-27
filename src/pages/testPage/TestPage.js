import React from 'react';
import './TestPage.css';

export default function SpringPopper() {
  return (
    <div id='gSignInWrapper'>
      <span class='label'>Sign in with:</span>
      <div id='customBtn' class='customGPlusSignIn'>
        <span class='icon'></span>
        <span class='buttonText'>Google</span>
      </div>
    </div>
  );
}
