import React from 'react';
import { useRouter } from 'next/router';
import { useApolloClient } from '@apollo/client';
import { useLogoutMutation, useMeQuery } from '../../generated/graphql';
import { AvatarDropdownMenu } from './AvatarDropdownMenu';
import { AvatarDropdownMenuIconButton } from './AvatarDropdownMenuIconButton';

export const AvatarDropdownMenuController: React.FC = () => {
  const router = useRouter();
  const apolloClient = useApolloClient();
  const [logout] = useLogoutMutation();
  const { data, loading } = useMeQuery();

  const handleLogoutClick = async () => {
    const response = await logout();
    await apolloClient.resetStore();
    if (response.data?.logout) {
      router.replace('/');
    }
  };

  const handleProfileClick = () => {
    if (data?.me && !loading) {
      router.push(`/profile/${data.me.username}`);
    }
  };

  return (
    <AvatarDropdownMenu>
      <AvatarDropdownMenuIconButton
        title="Profile"
        icon="profile"
        borderRadius="rounded-t-lg"
        onClick={handleProfileClick}
      />
      <AvatarDropdownMenuIconButton
        title="Settings"
        icon="settings"
        onClick={() => router.push('/settings')}
      />
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
