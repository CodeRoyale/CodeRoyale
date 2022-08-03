import { ROOM_PREFIX } from "../../utils/constants";
import { ControllerResponse, DataFromServer, Room } from "../../types/types";
import { getUser, updateUser } from "../userController";
import { LEFT_ROOM, ROOM_UPDATED } from "../../socketActions/serverActions";

export const leaveRoom = async (
  {},
  { socket, redis, currentUserId }: DataFromServer
): Promise<ControllerResponse<boolean>> => {
  let user = await getUser(currentUserId, redis!);
  if (!user) {
    return { error: "User who tried to join the room does not exist" };
  }

  const roomResult = await redis?.get(ROOM_PREFIX + user.currentRoom);
  let room: Room;
  if (roomResult) {
    room = JSON.parse(roomResult);
  } else {
    return { error: `Room with roomId:${user.currentRoom} does not exist` };
  }

  // TODO if user has joined team, remove him!!

  const newBench = room.state.bench.filter((ele) => ele !== currentUserId);
  room.state.bench = newBench;

  // decrement the currentMemberCount
  room.state.currMemberCount -= 1;

  await redis?.set(ROOM_PREFIX + user.currentRoom, JSON.stringify(room));

  // TODO : socket.leave(`${roomId}/${teamName}`);
  socket.to(user.currentRoom!).emit(ROOM_UPDATED, {
    type: LEFT_ROOM,
    data: room,
  });

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
