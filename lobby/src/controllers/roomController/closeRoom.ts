import { ControllerResponse, DataFromServer } from "../../types/types";
import { CloseRoomInput, Room } from "@coderoyale/common";
import { ROOM_PREFIX } from "../../utils/constants";
import { getUser, updateUser } from "../userController";
import api from "../../utils/api";

export const closeRoom = async (
  { roomId, forceCloseRoom }: CloseRoomInput,
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

  socket.to(roomId).emit("roomClosed");

  // updating users in cache
  allMemberIds.forEach(async (userId) => {
    let user = await getUser(userId, redis!);
    socket.leave(`${user?.currentRoom}/${user?.currentTeam}`);
    socket.leave(user?.currentRoom!);
    user = {
      // user cannot be null, we have to trust lobby
      ...user!,
      currentRoom: null,
      currentTeam: null,
    };
    await updateUser(user, redis!);
  });

  console.log(`userId:${currentUserId} closed the room ${roomId}`);
  return { data: true };
};
