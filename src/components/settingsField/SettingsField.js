import React from 'react';
import { Icon } from 'rsuite';
import './SettingsField.css';

const SettingsField = ({
  fieldSize,
  disabled,
  heading,
  value,
  userNameAvailable,
  checkUserNameAvailability,
  onChange,
  onBlur,
}) => {
  // Show span for availability of userName
  const handleAvailability = () => {
    if (checkUserNameAvailability && userNameAvailable === null) {
      return null;
    } else if (checkUserNameAvailability && userNameAvailable) {
      return (
        <span className='options-available'>
          <Icon icon='check-circle' /> Available
        </span>
      );
    } else if (checkUserNameAvailability && !userNameAvailable) {
      return (
        <span className='options-not-available'>
          <Icon icon='close-circle' /> Not Available
        </span>
      );
    } else {
      return null;
    }
  };

  // Check if the input is disabled or not in props
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
            onBlur={onBlur}
          ></input>
          {handleAvailability()}
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
