import React from 'react';
import { useRouter } from 'next/router';
import { DropdownMenuIconButton } from '../../components/DropdownMenuIconButton';
import { RoomUserAvatarPopup } from '../../components/avatar/RoomUserAvatarPopup';

interface RoomUserAvatarPopupControllerProps {
  username: string;
}

export const RoomUserAvatarPopupController: React.FC<
  RoomUserAvatarPopupControllerProps
> = ({ username }) => {
  const router = useRouter();

  return (
    <RoomUserAvatarPopup>
      <DropdownMenuIconButton
        title="Profile"
        icon="profile"
        borderRadius="rounded-t-lg"
        onClick={() => {
          router.push(`/profile/${username}`);
        }}
      />
      <DropdownMenuIconButton
        title="Remove from room"
        icon="removeUser"
        borderRadius="rounded-b-lg"
      />
      <DropdownMenuIconButton
        title="Give admin access"
        icon="addModerator"
        borderRadius="rounded-b-lg"
      />
    </RoomUserAvatarPopup>
  );
};
