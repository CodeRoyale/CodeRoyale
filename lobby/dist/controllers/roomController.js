"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoom = void 0;
const constants_1 = require("../utils/constants");
const room_1 = __importDefault(require("../models/room"));
const schemas_1 = require("../utils/schemas");
const createRoom = async (createRoomInput, { socket, redis, currentUserId }) => {
    var _a;
    if (!schemas_1.CreateRoomInputSchema.safeParse(createRoomInput).success) {
        return {
            error: "Input from client is bad",
        };
    }
    let user;
    const userInRedis = await (redis === null || redis === void 0 ? void 0 : redis.get(constants_1.SOCKET_USER_PREFIX + currentUserId));
    if (userInRedis) {
        user = JSON.parse(userInRedis);
    }
    if (user.roomCode) {
        return {
            error: "You are already in a room, leave to create a new room.",
        };
    }
    const roomObj = await room_1.default.createRoom(createRoomInput, currentUserId, redis);
    if (roomObj.status === 0) {
        return {
            error: roomObj.error ? roomObj.error : "Create room failed",
        };
    }
    const roomCode = (_a = roomObj.data) === null || _a === void 0 ? void 0 : _a.config.roomCode;
    user = Object.assign(Object.assign({}, user), { room: roomCode });
    await (redis === null || redis === void 0 ? void 0 : redis.set(constants_1.SOCKET_USER_PREFIX + user.userId, JSON.stringify(user)));
    socket.join(roomCode);
    return { data: roomObj.data };
};
exports.createRoom = createRoom;
//# sourceMappingURL=roomController.js.map