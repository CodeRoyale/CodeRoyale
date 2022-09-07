import Redis from "ioredis";
import { ROOM_PREFIX } from "../../utils/constants";
import { Room } from "@coderoyale/common";

export const getRoom = async (
  roomId: string,
  redis: Redis
): Promise<Room | null> => {
  const roomInRedis = await redis.get(ROOM_PREFIX + roomId);
  if (!roomInRedis) {
    return null;
  }

  const room = JSON.parse(roomInRedis);
  return room;
};
