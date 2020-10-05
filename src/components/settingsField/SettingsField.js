import React from 'react';
import './SettingsField.css';

const SettingsField = ({ fieldSize, disabled, heading, value, onChange }) => {
  if (!disabled) {
    return (
      <div>
        <div className='options-header'>{heading}</div>
        <div>
          <input
            type='text'
            size={fieldSize}
            className='options-input'
            value={value}
            onChange={onChange}
          ></input>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className='options-header'>{heading}</div>
        <div>
          <input
            type='text'
            size={fieldSize}
            disabled
            className='options-input'
            value={value}
          ></input>
        </div>
      </div>
    );
  }
};

export default SettingsField;
