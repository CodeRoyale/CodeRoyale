import Redis from "ioredis";
import { ControllerResponse, SocketUser } from "../../types/types";
import { SOCKET_USER_PREFIX } from "../../utils/constants";

export const getUser = async (
  userId: number,
  redis: Redis
): Promise<ControllerResponse<SocketUser>> => {
  const userInRedis = await redis.get(SOCKET_USER_PREFIX + userId);
  if (!userInRedis) {
    return {
      error: `Could not find a user with the userId ${userId}`,
    };
  }

  let user = JSON.parse(userInRedis);
  return {
    data: user,
  };
};
