import React, { ButtonHTMLAttributes } from 'react';
import { IoMdSettings } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';

type RoomCardIconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: string;
  onClick?: () => void;
};

const iconLookup: Record<string, React.ReactNode> = {
  settings: <IoMdSettings size={22} />,
  closeRoom: <IoClose size={22} />,
};

const RoomCardIconButton: React.FC<RoomCardIconButtonProps> = ({
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

export default RoomCardIconButton;
