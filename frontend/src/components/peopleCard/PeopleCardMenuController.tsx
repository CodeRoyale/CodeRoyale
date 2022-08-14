import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useRoom } from "../../global-stores";
import { WebSocketContext } from "../../modules/ws/WebSocketProvider";
import { inviteToRoom } from "../../service/roomSocket";
import { DropdownMenuIconButton } from "../DropdownMenuIconButton";
import { PeopleCardMenu } from "./PeopleCardMenu";

interface PeopleCardMenuControllerProps {
  username: string;
  userId: number;
}

export const PeopleCardMenuController: React.FC<
  PeopleCardMenuControllerProps
> = ({ username, userId }) => {
  const router = useRouter();
  const { conn } = useContext(WebSocketContext);
  const room = useRoom((state) => state.room);

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
        onClick={async () => {
          if (!room) {
            console.log("cannot invite to room");
          }

          await inviteToRoom(conn, {
            invitedUserId: userId,
            invitedRoomId: room?.config.id!,
          });
        }}
      />
    </PeopleCardMenu>
  );
};
