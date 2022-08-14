import React from "react";
import { useMeQuery } from "../generated/graphql";
import { useRoomInvites } from "../global-stores";
import { RoomInviteCardController } from "./RoomInviteCardController";

export const RoomInvitesController = () => {
  const { data, loading } = useMeQuery();
  const roomInvites = useRoomInvites((state) => state.invites);

  let body = null;

  if (loading) {
  } else if (!data?.me) {
  } else {
    body = (
      <>
        <h1 className="text-primary-100 font-semibold text-xl">Room Invites</h1>
        <div className="mt-4">
          {Object.keys(roomInvites).length > 0 ? (
            Object.keys(roomInvites).map((roomInvite, index) => {
              return (
                <RoomInviteCardController
                  key={index}
                  index={index}
                  roomInviteKey={roomInvite}
                  invitedRoomId={roomInvites[roomInvite].invitedRoomId}
                  senderUserId={roomInvites[roomInvite].sender}
                />
              );
            })
          ) : (
            <span className="text-primary-300 text-sm mt-4">
              You have zero/no room invites!
            </span>
          )}
        </div>
      </>
    );
  }

  return <div className="mt-8">{body}</div>;
};
