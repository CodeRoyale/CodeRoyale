import Redis from "ioredis";
import { ControllerResponse } from "src/types/types";
import { SOCKET_USER_PREFIX } from "../../utils/constants";
import { getUser } from "./getUser";

export const deleteUser = async (
  userId: number,
  redis: Redis
): Promise<ControllerResponse<string>> => {
  // check if user exists in cache
  const result = await getUser(userId, redis);
  if (result.error) {
    return {
      error: result.error,
    };
  }
  await redis.del(SOCKET_USER_PREFIX + userId);
  return {
    data: `User with id ${userId} removed from cache`,
  };
};
