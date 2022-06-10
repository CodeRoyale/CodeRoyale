import React, { ButtonHTMLAttributes } from 'react';
import { Error, Profile, RoomInvite, Settings } from '../icons';

type DropdownMenuIconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  icon: string;
  borderRadius?: string;
};

const getIconComponent = (icon: string) => {
  switch (icon) {
    case 'profile':
      return <Profile className="fill-primary-100" width={18} height={18} />;
    case 'settings':
      return <Settings className="fill-primary-100" width={18} height={18} />;
    case 'roomInvite':
      return <RoomInvite className="fill-primary-100" width={18} height={18} />;
    default:
      return <Error className="fill-primary-100" width={18} height={18} />;
  }
};

export const DropdownMenuIconButton: React.FC<DropdownMenuIconButtonProps> = ({
  title,
  icon,
  borderRadius = '',
  ...props
}) => {
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
