import React from 'react';
import './EditSettingsButton.css';
import { Link } from 'react-router-dom';

function EditSettingsButton() {
  const onClickSettings = () => {
    // TODO: Function to go to settings page...
  };
  return (
    <div>
      <Link to='/settings'>
        <button className='button-settings' onClick={onClickSettings}>
          Edit Settings
        </button>
      </Link>
    </div>
  );
}

export default EditSettingsButton;
