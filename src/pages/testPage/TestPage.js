import React from 'react';
import './TestPage.css';
import { FacebookFilled } from '@ant-design/icons';

export default function SpringPopper() {
  return (
    <div>
      <button className='facebook-test'>
        <FacebookFilled className='google-icon' />
        Login with Google
      </button>
    </div>
  );
}
