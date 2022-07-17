import Redis from "ioredis";
import { SOCKET_USER_PREFIX } from "../../utils/constants";
import { SocketUser } from "../../types/types";

export const updateUser = async (
  updatedUser: SocketUser,
  redis: Redis
): Promise<boolean> => {
  try {
    await redis?.set(
      SOCKET_USER_PREFIX + updatedUser.userId,
      JSON.stringify(updatedUser)
    );
    return true;
  } catch (err) {
    return false;
  }
};
