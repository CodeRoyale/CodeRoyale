import React from 'react';
import './SettingsField.css';

function SettingsField(props) {
  const fieldSize = 50;
  if (!props.disabled) {
    return (
      <div>
        <div className='options-header'>{props.heading}</div>
        <div>
          <input
            type='text'
            size={fieldSize}
            className='options-input'
            value={props.value}
            onChange={props.onChange}
          ></input>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className='options-header'>{props.heading}</div>
        <div>
          <input
            type='text'
            size={fieldSize}
            disabled
            className='options-input'
            value={props.value}
          ></input>
        </div>
      </div>
    );
  }
}

export default SettingsField;
