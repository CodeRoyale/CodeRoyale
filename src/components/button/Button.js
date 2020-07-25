import React from 'react';
import './Button.css';

// All styles available for button
const STYLES = ['btn--primary--normal', 'btn--primary--logout'];

// All sizes available for button
const SIZES = ['btn--small', 'btn--medium', 'btn--large'];

function Button({ children, type, onClick, buttonStyle, buttonSize }) {
  // Check if button style passed in props is valid
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  // Check if button size passed in props is valid
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <button
      className={`btn ${checkButtonStyle} ${checkButtonSize}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
