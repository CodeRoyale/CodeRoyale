import Redis from "ioredis";
import { ROOM_PREFIX } from "src/utils/constants";
import { Room } from "../../types/types";

export const updateRoom = async (
  updatedRoom: Room,
  redis: Redis
): Promise<boolean> => {
  try {
    await redis?.set(
      ROOM_PREFIX + updatedRoom.config.id,
      JSON.stringify(updatedRoom)
    );
    return true;
  } catch (err) {
    return false;
  }
};
