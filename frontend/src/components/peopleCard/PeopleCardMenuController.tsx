import { useRouter } from 'next/router';
import React from 'react';
import { DropdownMenuIconButton } from '../DropdownMenuIconButton';
import { PeopleCardMenu } from './PeopleCardMenu';

interface PeopleCardMenuControllerProps {
  username: string;
}

export const PeopleCardMenuController: React.FC<
  PeopleCardMenuControllerProps
> = ({ username }) => {
  const router = useRouter();

  return (
    <PeopleCardMenu>
      <DropdownMenuIconButton
        title="Profile"
        icon="profile"
        borderRadius="rounded-t-lg"
        onClick={() => {
          router.push(`/profile/${username}`);
        }}
      />
      <DropdownMenuIconButton
        title="Invite to room"
        icon="roomInvite"
        borderRadius="rounded-b-lg"
      />
    </PeopleCardMenu>
  );
};
