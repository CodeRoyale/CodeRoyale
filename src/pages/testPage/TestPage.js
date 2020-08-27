import React from 'react';
<<<<<<< HEAD
import 'rsuite/lib/styles/index.less';
import { Alert } from 'rsuite';

export default function SpringPopper() {
  return (
    <div>
      <button onClick={() => Alert.error('This is an error message.')}>
        {' '}
        Error{' '}
      </button>
=======
import './TestPage.css';

export default function SpringPopper() {
  return (
    <div id='gSignInWrapper'>
      <span class='label'>Sign in with:</span>
      <div id='customBtn' class='customGPlusSignIn'>
        <span class='icon'></span>
        <span class='buttonText'>Google</span>
      </div>
>>>>>>> origin/develop
    </div>
  );
}
