import React from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { IoSettingsSharp } from 'react-icons/io5';
import { MdOutlineError } from 'react-icons/md';
import propTypes from 'prop-types';

const getIconComponent = (icon) => {
  switch (icon) {
    case 'profile':
      return <FaUserAlt className='text-primary-100' size={16} />;
    case 'settings':
      return <IoSettingsSharp className='text-primary-100' size={16} />;
    default:
      return <MdOutlineError className='text-primary-100' size={16} />;
  }
};

const AvatarDropdownMenuIconButton = ({ title, icon, borderRadius }) => {
  const iconComponent = getIconComponent(icon);

  return (
    <button
      type='button'
      className={`bg-primary-800 py-2.5 pl-6 pr-28 flex items-center w-full ${borderRadius} transition duration-200 ease-in-out hover:bg-primary-600`}
    >
      {iconComponent}
      <span className='ml-4 text-primary-100 text-sm'>{title}</span>
    </button>
  );
};

export default AvatarDropdownMenuIconButton;

AvatarDropdownMenuIconButton.propTypes = {
  title: propTypes.string.isRequired,
  icon: propTypes.string.isRequired,
  borderRadius: propTypes.string,
};

AvatarDropdownMenuIconButton.defaultProps = {
  borderRadius: '',
};
