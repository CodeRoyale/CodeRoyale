import React, { ButtonHTMLAttributes } from 'react';
import { Google } from '../icons';

export const GoogleAuthButton: React.FC<
  ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => {
  return (
    <button
      type="button"
      className="flex items-center justify-center w-full bg-primary-700 py-2.5 rounded-md cursor-pointer transition duration-200 ease-in-out hover:bg-primary-600 focus:outline focus:outline-offset-2 focus:outline-focus-outline"
      {...props}
    >
      <Google className="fill-primary-100" width={28} height={28} />
      <span className="text-primary-100 ml-2.5">{children}</span>
    </button>
  );
};
