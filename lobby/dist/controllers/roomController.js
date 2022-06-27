"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoom = void 0;
const constants_1 = require("../utils/constants");
const roomModel_1 = __importDefault(require("../models/roomModel"));
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
    const roomObj = await roomModel_1.default.createRoom(createRoomInput, currentUserId, redis);
    if (roomObj.status === 0) {
        return {
            error: roomObj.error ? roomObj.error : "Create room failed",
        };
    }
    const roomId = (_a = roomObj.data) === null || _a === void 0 ? void 0 : _a.config.id;
    user = Object.assign(Object.assign({}, user), { currentRoom: roomId });
    await (redis === null || redis === void 0 ? void 0 : redis.set(constants_1.SOCKET_USER_PREFIX + user.userId, JSON.stringify(user)));
    socket.join(roomId);
    return { data: roomObj.data };
};
exports.createRoom = createRoom;
//# sourceMappingURL=roomController.js.map