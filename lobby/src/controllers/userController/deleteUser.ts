import Redis from "ioredis";
import { SOCKET_USER_PREFIX } from "../../utils/constants";
import { getUser } from "./getUser";

export const deleteUser = async (
  userId: number,
  redis: Redis
): Promise<boolean> => {
  // check if user exists in cache
  const user = await getUser(userId, redis);
  if (!user) {
    return false;
  }
  await redis.del(SOCKET_USER_PREFIX + userId);
  return true;
};
