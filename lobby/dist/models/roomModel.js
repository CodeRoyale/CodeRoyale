"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../utils/constants");
const api_1 = __importDefault(require("../utils/api"));
const createRoom = async (createRoomInput, currentUserId, redis) => {
    let roomId = null;
    let response;
    try {
        response = await api_1.default.createRoom({
            title: createRoomInput.config.title,
            private: createRoomInput.config.private,
            maxMembers: createRoomInput.config.maxMembers,
            creatorId: currentUserId,
        });
        roomId = response.createRoom.id;
    }
    catch (error) {
        return {
            status: 0,
            error: "Failed to create room in DB",
        };
    }
    const room = await redis.get(constants_1.ROOM_PREFIX + roomId);
    if (room) {
        return {
            status: 0,
            error: "There is already a room present by the code given",
        };
    }
    const newRoom = {
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
    await redis.set(constants_1.ROOM_PREFIX + roomId, JSON.stringify(newRoom));
    return { status: 1, data: newRoom };
};
exports.default = { createRoom };
//# sourceMappingURL=roomModel.js.map