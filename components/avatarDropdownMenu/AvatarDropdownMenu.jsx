import React from 'react';
import AvatarDropdownMenuIconButton from './AvatarDropdownMenuIconButton';

const AvatarDropdownMenu = () => {
  // { icon: title }
  const dropdownOptions = {
    profile: 'Profile',
    settings: 'Settings',
  };

  return (
    <div className='rounded-lg'>
      {Object.keys(dropdownOptions).map((dropdownOption, index) => (
        <AvatarDropdownMenuIconButton
          title={dropdownOptions[dropdownOption]}
          icon={dropdownOption}
          borderRadius={index === 0 ? 'rounded-t-lg' : ''}
        />
      ))}
      <button
        type='button'
        className='bg-primary-700 pt-2 pb-2.5 pr-32 rounded-b-lg w-full transition duration-200 ease-in-out hover:bg-primary-600'
      >
        <span className='text-primary-100 text-sm font-bold'>Log out</span>
      </button>
    </div>
  );
};

export default AvatarDropdownMenu;
