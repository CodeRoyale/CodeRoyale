import React from 'react';
import './SettingsInput.css';

function SettingsInput(props) {
  if (!props.disabled) {
    return (
      <div>
        <div className='options-header'>{props.heading}</div>
        <div>
          <input
            type='text'
            size='70'
            className='options-input'
            value={props.value}
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
            size='70'
            disabled
            className='options-input'
            value={props.value}
          ></input>
        </div>
      </div>
    );
  }
}

export default SettingsInput;
