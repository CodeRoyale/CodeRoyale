import Redis from "ioredis";
import { SocketUser } from "../../types/types";
import { SOCKET_USER_PREFIX } from "../../utils/constants";
import { getUser } from "./getUser";
import { updateUser } from "./updateUser";

export const addUser = async (
  input: SocketUser,
  redis: Redis
): Promise<SocketUser> => {
  // checking if user exists in cache
  const user = await getUser(input.userId, redis);
  if (user) {
    user.socketId = input.socketId;
    user.hasActiveConnection = true;
    const updateUserResult = await updateUser(user, redis);
    // if update in cache was successful
    if (updateUserResult) {
      console.log(`userId:${user.userId} reconnected`);
      return user;
    }
  }

  // create a new user in cache
  const newUser: SocketUser = {
    userId: input.userId,
    socketId: input.socketId,
    currentRoom: input.currentRoom,
    currentTeam: input.currentTeam,
    hasActiveConnection: input.hasActiveConnection,
  };
  await redis?.set(
    SOCKET_USER_PREFIX + newUser.userId,
    JSON.stringify(newUser)
  );
  console.log(`userId:${newUser.userId} connected`);

  return newUser;
};
