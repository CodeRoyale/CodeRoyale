import { CLOSED_ROOM } from "../../socketActions/serverActions";
import { ControllerResponse, DataFromServer, Room } from "src/types/types";
import { ROOM_PREFIX } from "../../utils/constants";
import { ROOM_UPDATED } from "../../socketActions/serverActions";
import { getUser, updateUser } from "../userController";
import api from "../../utils/api";

interface CloseRoomInterface {
  roomId: string;
  forceCloseRoom: boolean;
}

export const closeRoom = async (
  { roomId, forceCloseRoom }: CloseRoomInterface,
  { socket, redis, currentUserId }: DataFromServer
): Promise<ControllerResponse<boolean>> => {
  const roomResult = await redis?.get(ROOM_PREFIX + roomId);
  let room: Room;

  if (roomResult) {
    room = JSON.parse(roomResult);
  } else {
    return { error: `Room with roomId:${roomId} does not exist` };
  }

  if (room.config.adminUserId !== currentUserId) {
    return { error: "Only admin can do this" };
  }

  if (
    !forceCloseRoom &&
    (room.competition.isOngoing || room.competition.veto.isOngoing)
  ) {
    return {
      error: "There is a ongoing competition. Finish it first",
    };
  }

  // everyone from room bench
  const allMemberIds = room.state.bench;
  // getting all users in room into allMemberIds
  Object.keys(room.teams).forEach((teamName) => {
    room.teams[teamName].forEach((memberId) => {
      allMemberIds.push(memberId);
    });
  });

  // delete from postgres db
  try {
    const response = await api.deleteRoom(roomId);
    console.log(response);
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to delete room from db. Please try again",
    };
  }

  await redis?.del(ROOM_PREFIX + roomId);

  // updating users in cache
  allMemberIds.forEach(async (userId) => {
    let user = await getUser(userId, redis!);
    user = {
      // user cannot be null, we have to trust lobby
      ...user!,
      currentRoom: null,
      currentTeam: null,
    };
    await updateUser(user, redis!);
  });

  socket.to(roomId).emit(ROOM_UPDATED, {
    type: CLOSED_ROOM,
    data: true,
  });
  socket.emit(CLOSED_ROOM);
  console.log(`userId:${currentUserId} closed the room ${roomId}`);
  return { data: true };
};
