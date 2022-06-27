import { SOCKET_USER_PREFIX } from "../utils/constants";
import RoomModel from "../models/roomModel";
import {
  ControllerResponse,
  CreateRoomInput,
  DataFromServer,
  Room,
} from "../types/types";
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

  // find user in redis
  let user;
  const userInRedis = await redis?.get(SOCKET_USER_PREFIX + currentUserId);
  if (userInRedis) {
    user = JSON.parse(userInRedis);
  }
  // disabled for testing, have to re enable
  // if (user.currentRoom) {
  //   // user already in a room, must leave room to create a new room
  //   return {
  //     error: "You are already in a room, leave to create a new room.",
  //   };
  // }
  // createRoom logic (user is not in a room and hence can continue creating a room)
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

  // now put current user into the room
  const roomId = roomObj.data?.config.id;
  user = {
    ...user,
    currentRoom: roomId,
  };
  await redis?.set(SOCKET_USER_PREFIX + user.userId, JSON.stringify(user));
  // created room
  socket.join(roomId!);
  return { data: roomObj.data };
};
