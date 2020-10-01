import React from 'react';
import './FloatingButton.css';

function FloatingButton({ children, onClick }) {
  return (
    <div className='floating-button' onClick={onClick}>
      {children}
    </div>
  );
}

export default FloatingButton;
