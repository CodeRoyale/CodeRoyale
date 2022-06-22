import { SOCKET_USER_PREFIX } from "../utils/constants";
import RoomModel from "../models/room";
import {
  ControllerResponse,
  CreateRoomInput,
  DataFromServer,
  Room,
} from "../types";
import { CreateRoomInputSchema } from "../utils/schemas";

export const createRoom = async (
  createRoomInput: CreateRoomInput,
  { socket, redis, currentUserId }: DataFromServer
): Promise<ControllerResponse<Room>> => {
  // check input from client
  if (!CreateRoomInputSchema.safeParse(createRoomInput).success) {
    return {
      error: "Input from client is bad",
    };
  }

  // create room snippet in db

  // find user in redis
  let user;
  const userInRedis = await redis?.get(SOCKET_USER_PREFIX + currentUserId);
  if (userInRedis) {
    user = JSON.parse(userInRedis);
  }
  if (user.roomCode) {
    // user already in a room, must leave room to create a new room
    return {
      error: "You are already in a room, leave to create a new room.",
    };
  }
  // createRoom logic
  const roomObj = await RoomModel.createRoom(
    createRoomInput,
    currentUserId,
    redis!
  );
  if (roomObj.status === 0) {
    return {
      error: roomObj.error ? roomObj.error : "Create room failed",
    };
  }

  const roomCode = roomObj.data?.config.roomCode;

  user = {
    ...user,
    room: roomCode,
  };
  await redis?.set(SOCKET_USER_PREFIX + user.userId, JSON.stringify(user));
  // created room
  socket.join(roomCode!);
  return { data: roomObj.data };
};
