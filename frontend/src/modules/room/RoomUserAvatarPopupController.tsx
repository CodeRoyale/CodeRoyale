import React from "react";
import { useRouter } from "next/router";
import { DropdownMenuIconButton } from "../../components/DropdownMenuIconButton";
import { RoomUserAvatarPopup } from "../../components/avatar/RoomUserAvatarPopup";
import { useMeQuery } from "../../generated/graphql";
import { useRoom } from "../../global-stores";

interface RoomUserAvatarPopupControllerProps {
  username: string;
}

export const RoomUserAvatarPopupController: React.FC<
  RoomUserAvatarPopupControllerProps
> = ({ username }) => {
  const router = useRouter();
  const { data } = useMeQuery();
  const room = useRoom((state) => state.room);

  return (
    <RoomUserAvatarPopup>
      <DropdownMenuIconButton
        title="Profile"
        icon="profile"
        borderRadius={
          data?.me?.id === room?.config.adminUserId &&
          username !== data?.me?.username
            ? "rounded-t-lg"
            : "rounded-lg"
        }
        onClick={() => {
          router.push(`/profile/${username}`);
        }}
      />
      {data?.me?.id === room?.config.adminUserId &&
      username !== data?.me?.username ? (
        <>
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
        </>
      ) : null}
    </RoomUserAvatarPopup>
  );
};
