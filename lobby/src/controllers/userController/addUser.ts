import Redis from "ioredis";
import { ControllerResponse, SocketUser } from "../../types/types";
import { SOCKET_USER_PREFIX } from "../../utils/constants";
import { getUser } from "./getUser";
import { updateUser } from "./updateUser";

export const addUser = async (
  input: SocketUser,
  redis: Redis
): Promise<ControllerResponse<SocketUser>> => {
  // checking if user exists in cache
  const result = await getUser(input.userId, redis);
  if (result.data) {
    let user = result.data;
    user.socketId = input.socketId;
    const updateResult = await updateUser(user, redis);
    // if update in cache was successful
    if (updateResult.data) {
      console.log(`userId:${user.userId} reconnected`);
      return { data: user };
    }
  }

  // create a new user in cache
  const newUser: SocketUser = {
    userId: input.userId,
    socketId: input.socketId,
    currentRoom: input.currentRoom,
  };
  await redis?.set(
    SOCKET_USER_PREFIX + newUser.userId,
    JSON.stringify(newUser)
  );
  console.log(`userId:${newUser.userId} connected`);

  return { data: newUser };
};
