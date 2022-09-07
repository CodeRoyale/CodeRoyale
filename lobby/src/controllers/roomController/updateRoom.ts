import Redis from "ioredis";
import { ROOM_PREFIX } from "../../utils/constants";
import { Room } from "@coderoyale/common";

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
