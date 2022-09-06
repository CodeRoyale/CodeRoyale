import Redis from "ioredis";
import { RoomTimer } from "src/types/types";
import { ROOM_TIMER_PREFIX } from "../../utils/constants";

export const getRoomTimer = async (
  roomId: string,
  redis: Redis
): Promise<RoomTimer | null> => {
  const timerInRedis = await redis.get(ROOM_TIMER_PREFIX + roomId);

  if (!timerInRedis) {
    return null;
  }

  const roomTimer = JSON.parse(timerInRedis);
  return roomTimer;
};
