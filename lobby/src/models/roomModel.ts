import Redis from "ioredis";
import { ROOM_PREFIX } from "../utils/constants";
import { ModelResponse, Room, CreateRoomInput } from "../types/types";
import api from "../utils/api";

const createRoom = async (
  createRoomInput: CreateRoomInput,
  currentUserId: number,
  redis: Redis
): Promise<ModelResponse<Room>> => {
  // this room id is generated by db
  let roomId = null;
  let response;

  // first create room in db
  try {
    response = await api.createRoom({
      title: createRoomInput.config.title,
      private: createRoomInput.config.private,
      creatorId: currentUserId,
    });

    roomId = response.createRoom.id;
  } catch (error) {
    return {
      status: 0,
      error: "Failed to create room in DB",
    };
  }

  const room = await redis.get(ROOM_PREFIX + roomId);
  if (room) {
    return {
      status: 0,
      error: "There is already a room present by the code given",
    };
  }

  const newRoom: Room = {
    config: {
      id: roomId,
      private: response.createRoom.private,
      title: response.createRoom.title,
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

  await redis.set(ROOM_PREFIX + roomId, JSON.stringify(newRoom));
  return { status: 1, data: newRoom };
};

export default { createRoom };
