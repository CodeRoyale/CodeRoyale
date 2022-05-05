import React, { ButtonHTMLAttributes } from 'react';

type ButtonClassType = 'primary' | 'secondary' | 'transparent' | 'dark';
type SizeType = 'small' | 'normal' | 'large';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonClass: ButtonClassType;
  size: SizeType;
  children: string;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  buttonClass = 'primary',
  size = 'normal',
  children,
  onClick,
  ...props
}) => {
  const buttonClasses = {
    primary:
      'bg-button-primary-default text-white transition duration-200 ease-in-out hover:bg-button-primary-hover focus:outline focus:outline-offset-2 focus:outline-focus-outline',
    secondary:
      'bg-button-secondary-default text-primary-100 transition duration-200 ease-in-out hover:bg-button-secondary-hover focus:outline focus:outline-offset-2 focus:outline-focus-outline',
    transparent:
      'bg-transparent text-primary-100 transition duration-200 ease-in-out hover:underline',
    dark: 'bg-primary-800 text-primary-100 transition duration-200 ease-in-out hover:bg-primary-600 focus:outline focus:outline-offset-2 focus:outline-focus-outline',
  };

  const sizeClasses = {
    small: 'px-2 py-1',
    normal: 'px-7 py-2',
    large: 'px-9 py-3',
  };

  return (
    <button
      type="button"
      className={`${buttonClasses[buttonClass]} ${sizeClasses[size]} font-medium rounded-md`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
