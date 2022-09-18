import { DataFromServer } from "../../types/types";
import { Room, ControllerResponse } from "@coderoyale/common";
import { getUser, updateUser } from "../userController";
import { getRoom } from "./getRoom";
import { updateRoom } from "./updateRoom";

export const joinRoom = async (
  roomId: string,
  { socket, redis, currentUserId }: DataFromServer
): Promise<ControllerResponse<Room>> => {
  const user = await getUser(currentUserId, redis!);
  if (!user) {
    return { error: "User who tried to join the room does not exist" };
  }

  const room = await getRoom(roomId, redis!);
  if (!room) {
    return { error: `Room with roomId:${roomId} does not exist` };
  }

  // (only run if room doesn't exists) and (user is allowed if private) and (space is there)
  // ! privateList needs to be added
  if (room["state"]["currMemberCount"] + 1 > room["config"]["maxMembers"]) {
    return { error: "Max members in room reached" };
  }

  // User is already in a different room do not allow
  if (user?.currentRoom) {
    return { error: "User is already in a room" };
  }

  room.state.bench.push(currentUserId);
  room.state.currMemberCount += 1;
  room.state.users = {
    ...room.state.users,
    [currentUserId]: {
      team: null,
    },
  };
  await updateRoom(room, redis!);

  user.currentRoom = roomId;
  await updateUser(user!, redis!);

  socket.join(roomId);
  socket.to(roomId).emit("roomUpdated", room);
  socket.to(roomId).emit("userJoinedRoom", {
    joineeUserId: currentUserId,
  });
  socket.to(roomId).emit("receiveChatMessage", {
    type: "ROOM_ALERT_MESSAGE",
    fromUserId: currentUserId,
    message: "joined the room",
  });

  console.log(`userId:${currentUserId} joined from ${roomId}`);
  return { data: room };
};
