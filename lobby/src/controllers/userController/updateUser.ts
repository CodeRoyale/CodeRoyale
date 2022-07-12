import Redis from "ioredis";
import { SOCKET_USER_PREFIX } from "../../utils/constants";
import { ControllerResponse, SocketUser } from "../../types/types";

export const updateUser = async (
  updatedUser: SocketUser,
  redis: Redis
): Promise<ControllerResponse<SocketUser>> => {
  try {
    await redis?.set(
      SOCKET_USER_PREFIX + updatedUser.userId,
      JSON.stringify(updatedUser)
    );
    return {
      data: updatedUser,
    };
  } catch (err) {
    return {
      error: err.message,
    };
  }
};
