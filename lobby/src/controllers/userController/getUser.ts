import Redis from "ioredis";
import { SocketUser } from "../../types/types";
import { SOCKET_USER_PREFIX } from "../../utils/constants";

export const getUser = async (
  userId: number,
  redis: Redis
): Promise<SocketUser | null> => {
  const userInRedis = await redis.get(SOCKET_USER_PREFIX + userId);
  if (!userInRedis) {
    return null;
  }

  let user = JSON.parse(userInRedis);
  return user;
};
