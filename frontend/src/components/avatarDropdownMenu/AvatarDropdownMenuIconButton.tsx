import React, { ButtonHTMLAttributes } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { IoSettingsSharp } from 'react-icons/io5';
import { MdOutlineError } from 'react-icons/md';

type AvatarDropdownMenuIconButtonProps =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    title: string;
    icon: string;
    borderRadius?: string;
  };

const getIconComponent = (icon: string) => {
  switch (icon) {
    case 'profile':
      return <FaUserAlt className="text-primary-100" size={16} />;
    case 'settings':
      return <IoSettingsSharp className="text-primary-100" size={16} />;
    default:
      return <MdOutlineError className="text-primary-100" size={16} />;
  }
};

export const AvatarDropdownMenuIconButton: React.FC<
  AvatarDropdownMenuIconButtonProps
> = ({ title, icon, borderRadius = '', ...props }) => {
  const iconComponent = getIconComponent(icon);

  return (
    <button
      type="button"
      className={`bg-primary-800 py-2.5 pl-6 pr-28 flex items-center w-full ${borderRadius} transition duration-200 ease-in-out hover:bg-primary-600`}
      {...props}
    >
      {iconComponent}
      <span className="ml-4 text-primary-100 text-sm">{title}</span>
    </button>
  );
};
