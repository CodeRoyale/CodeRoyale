import Redis from "ioredis";
import { ROOM_PREFIX } from "../utils/constants";
import { v4 as uuid } from "uuid";
import { ModelResponse, Room, CreateRoomInput } from "../types";

const createRoom = async (
  createRoomInput: CreateRoomInput,
  currentUserId: number,
  redis: Redis
): Promise<ModelResponse<Room>> => {
  // generating a room code
  const roomCode = uuid();
  try {
    const room = await redis.get(ROOM_PREFIX + roomCode);
    if (room) {
      return {
        status: 0,
        error: "There is already a room present by the code given",
      };
    }

    const newRoom: Room = {
      config: {
        roomCode: roomCode,
        adminUserId: currentUserId,
        maxTeams: createRoomInput.config.maxTeams,
        maxMembersPerTeam: createRoomInput.config.maxMembersPerTeam,
        maxMembers: createRoomInput.config.maxMembers,
      },
      state: {
        currMemberCount: 1,
        bannedMemberIds: [],
        bench: [currentUserId],
      },
      competition: {
        questionIds: [],
        maxQuestions: createRoomInput.competition.maxQuestions,
        contestStartedAt: null,
        contestEndedAt: null,
        isCompOn: false,
        timeLimit: createRoomInput.competition.timeLimit,
        veto: {
          questionCount: createRoomInput.veto.questionCount,
          questionIds: [],
          maxVoteAllowed: createRoomInput.veto.maxVoteAllowed,
          isVetoOn: false,
          timeLimit: createRoomInput.veto.timeLimit,
          votedUserIds: [],
        },
      },
    };

    await redis.set(ROOM_PREFIX + roomCode, JSON.stringify(newRoom));
    return { status: 1, data: newRoom };
  } catch (error) {
    console.log(error);
    return { status: 0, error: error.message };
  }
};

export default { createRoom };
