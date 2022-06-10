import React, { ButtonHTMLAttributes } from 'react';
import { Close, Settings } from '../../icons';

type RoomCardIconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: string;
  onClick?: () => void;
};

const iconLookup: Record<string, React.ReactNode> = {
  settings: <Settings className="fill-primary-100" width={22} height={22} />,
  closeRoom: <Close className="fill-primary-100" width={22} height={22} />,
};

export const RoomCardIconButton: React.FC<RoomCardIconButtonProps> = ({
  icon,
  onClick,
  ...props
}) => (
  <button
    type="button"
    className="bg-primary-800 text-primary-100 transition duration-200 ease-in-out hover:bg-primary-600 focus:outline focus:outline-offset-2 focus:outline-focus-outline font-medium rounded-md px-4 py-2"
    onClick={onClick}
    {...props}
  >
    {iconLookup[icon]}
  </button>
);
