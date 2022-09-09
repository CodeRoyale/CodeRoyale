import { InviteToRoomInput } from "@coderoyale/common";
import { DataFromServer } from "../../types/types";
import { getUser } from "../userController";
import { getRoom } from "./getRoom";

export const inviteToRoom = async (
  { invitedUserId, invitedRoomId }: InviteToRoomInput,
  { currentUserId, io, redis }: DataFromServer
): Promise<boolean> => {
  // get the socketId of invited user and get room from redis
  const invitedUser = await getUser(invitedUserId, redis!);
  const invitedRoom = await getRoom(invitedRoomId, redis!);
  // invited user/room doesnot exist
  if (!invitedUser || !invitedRoom) {
    return false;
  }

  if (invitedUser.currentRoom) {
    // cannot invite a user that is currently in another room
    return false;
  }

  // to individual socketid (private message)
  io?.to(invitedUser.socketId).emit("invitedToRoom", {
    by: currentUserId,
    to: invitedRoomId,
  });

  return true;
};
