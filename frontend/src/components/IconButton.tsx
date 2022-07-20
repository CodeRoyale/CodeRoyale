import React, { ButtonHTMLAttributes } from 'react';
import { Close, Launch, Settings } from '../icons';

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: string;
};

const iconLookup: Record<string, React.ReactNode> = {
  settings: <Settings className="fill-primary-100" width={22} height={22} />,
  close: <Close className="fill-primary-100" width={22} height={22} />,
  launch: <Launch className="fill-primary-100" width={22} height={22} />,
};

export const IconButton: React.FC<IconButtonProps> = ({ icon, ...props }) => (
  <button
    type="button"
    className="bg-primary-800 text-primary-100 transition duration-200 ease-in-out hover:bg-primary-600 focus:outline focus:outline-offset-2 focus:outline-focus-outline font-medium rounded-md px-4 py-2"
    {...props}
  >
    {iconLookup[icon]}
  </button>
);
