import React from 'react';
import './SignoutButton.css';

function SignoutButton() {
  const onClickSignout = () => {
    // TODO: Function to Sign out...
  };

  return (
    <div>
      <button className='button-signout' onClick={onClickSignout}>
        Sign Out
      </button>
    </div>
  );
}

export default SignoutButton;
