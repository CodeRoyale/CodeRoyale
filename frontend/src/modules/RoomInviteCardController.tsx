import React from "react";
import { useRouter } from "next/router";
import { RoomInviteCard } from "../components/RoomInviteCard";
import { useUserFromIdQuery } from "../generated/graphql";
import { useRoomInvites } from "../global-stores";

interface RoomInviteCardControllerProps {
  index: number;
  roomInviteKey: string;
  senderUserId: number;
  invitedRoomId: string;
}

export const RoomInviteCardController: React.FC<
  RoomInviteCardControllerProps
> = ({ index, roomInviteKey, senderUserId, invitedRoomId }) => {
  const router = useRouter();
  const { data, loading } = useUserFromIdQuery({
    variables: { userId: senderUserId },
  });
  const deleteRoomInvite = useRoomInvites((state) => state.deleteInvite);

  let body = null;

  if (loading) {
  } else if (!data?.userFromId.user) {
  } else {
    body = (
      <RoomInviteCard
        profilePicture={data.userFromId.user.profilePicture}
        name={data.userFromId.user.name}
        username={data.userFromId.user.username}
        marginTop={index !== 0 ? "mt-6" : null}
        acceptBtnOnClick={() => {
          router.push(`/room/${invitedRoomId}`);
          // delete the room invite since user joined the room by clicking the accept button
          deleteRoomInvite(roomInviteKey);
        }}
        declineBtnOnClick={() => {
          deleteRoomInvite(roomInviteKey);
        }}
        nameOrUsernamebtnOnClick={() => {
          router.push(`/profile/${data.userFromId.user?.username}`);
        }}
      />
    );
  }

  return <>{body}</>;
};
