import { ControllerResponse } from "@coderoyale/common";
import { DataFromServer } from "../../types/types";
import { getUser, updateUser } from "../userController";
import { getRoom } from "./getRoom";
import { updateRoom } from "./updateRoom";

export const leaveRoom = async ({
  socket,
  redis,
  currentUserId,
}: DataFromServer): Promise<ControllerResponse<boolean>> => {
  let user = await getUser(currentUserId, redis!);
  if (!user) {
    return { error: "User who tried to join the room does not exist" };
  }

  const room = await getRoom(user.currentRoom!, redis!);
  if (!room) {
    return { error: `Room with roomId:${user.currentRoom} does not exist` };
  }

  // if user is part of a team
  if (user.currentTeam) {
    const newTeam = room.teams[user.currentTeam].filter(
      (ele) => ele !== currentUserId
    );
    room.teams[user.currentTeam] = newTeam;
  } else {
    const newBench = room.state.bench.filter((ele) => ele !== currentUserId);
    room.state.bench = newBench;
  }

  // decrement the currentMemberCount
  room.state.currMemberCount -= 1;

  // await redis?.set(ROOM_PREFIX + user.currentRoom, JSON.stringify(room));
  await updateRoom(room, redis!);

  socket.to(user.currentRoom!).emit("roomUpdated", room);
  socket.to(user.currentRoom!).emit("receiveChatMessage", {
    type: "ROOM_ALERT_MESSAGE",
    fromUserId: currentUserId,
    message: "has left the room",
  });

  socket.leave(`${user.currentRoom}/${user.currentTeam}`);
  socket.leave(user.currentRoom!);
  console.log(`User: ${currentUserId} has left the room: ${user.currentRoom}`);

  user = {
    ...user,
    currentRoom: null,
    currentTeam: null,
  };
  await updateUser(user, redis!);

  return { data: true };
};
