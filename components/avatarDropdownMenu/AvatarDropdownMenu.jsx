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
      {Object.keys(dropdownOptions).map((dropdownOption, index) => {
        const dropdownOptionsKeys = Object.keys(dropdownOptions);
        return (
          <AvatarDropdownMenuIconButton
            title={dropdownOptions[dropdownOption]}
            icon={dropdownOption}
            borderRadius={
              // eslint-disable-next-line no-nested-ternary
              index === 0
                ? 'rounded-t-lg'
                : index === dropdownOptionsKeys.length - 1
                ? 'rounded-b-lg'
                : ''
            }
          />
        );
      })}
    </div>
  );
};

export default AvatarDropdownMenu;
