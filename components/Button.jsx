import React from 'react';
import propTypes from 'prop-types';

const Button = ({ buttonClass, size, children, onClick, ...props }) => {
  const buttonClasses = {
    primary:
      'bg-button-primary-default text-white transition duration-200 ease-in-out hover:bg-button-primary-hover focus:outline focus:outline-offset-2 focus:outline-focus-outline',
    secondary:
      'bg-button-secondary-default text-primary-100 transition duration-200 ease-in-out hover:bg-button-secondary-hover focus:outline focus:outline-offset-2 focus:outline-focus-outline',
    transparent:
      'bg-transparent text-primary-100 transition duration-200 ease-in-out hover:underline',
  };

  const sizeClasses = {
    small: 'px-2 py-1',
    normal: 'px-7 py-2',
    large: 'px-9 py-3',
  };

  return (
    <button
      type='button'
      className={`${buttonClasses[buttonClass]} ${sizeClasses[size]} font-medium rounded-md`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

Button.propTypes = {
  buttonClass: propTypes.oneOf(['primary', 'secondary', 'transparent']),
  size: propTypes.oneOf(['small', 'normal', 'large']),
  children: propTypes.string.isRequired,
  onClick: propTypes.func,
};

Button.defaultProps = {
  buttonClass: 'primary',
  size: 'normal',
  onClick: undefined,
};
