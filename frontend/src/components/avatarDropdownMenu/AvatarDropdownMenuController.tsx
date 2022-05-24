import React from 'react';
import { useRouter } from 'next/router';
import { useApolloClient } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';
import { useLogoutMutation } from '../../generated/graphql';
import { AvatarDropdownMenu } from './AvatarDropdownMenu';
import { AvatarDropdownMenuIconButton } from './AvatarDropdownMenuIconButton';

export const AvatarDropdownMenuController: React.FC = () => {
  const router = useRouter();
  const apolloClient = useApolloClient();
  const [logout] = useLogoutMutation();

  // { icon: title }
  const dropdownOptions: Record<string, string> = {
    profile: 'Profile',
    settings: 'Settings',
  };

  const handleLogoutClick = async () => {
    const response = await logout();
    await apolloClient.resetStore();
    if (response.data?.logout) {
      router.replace('/');
    }
  };

  return (
    <AvatarDropdownMenu>
      {Object.keys(dropdownOptions).map((dropdownOption, index) => (
        <AvatarDropdownMenuIconButton
          key={uuidv4()}
          title={dropdownOptions[dropdownOption]}
          icon={dropdownOption}
          borderRadius={index === 0 ? 'rounded-t-lg' : ''}
        />
      ))}
      <button
        type="button"
        className="bg-primary-700 pt-2 pb-2.5 pr-32 rounded-b-lg w-full transition duration-200 ease-in-out hover:bg-primary-600"
        onClick={handleLogoutClick}
      >
        <span className="text-primary-100 text-sm font-bold">Log out</span>
      </button>
    </AvatarDropdownMenu>
  );
};
