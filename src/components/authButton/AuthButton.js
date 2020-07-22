/*
    Auth button for the project...
*/

import React from 'react';
import './AuthButton.css';
import { Link } from 'react-router-dom';

function AuthButton({ text, to }) {
  return (
    <div>
      <Link to={to} style={{ textDecoration: 'none' }}>
        <button className='auth-button'>{text}</button>
      </Link>
    </div>
  );
}

export default AuthButton;
