"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomsRouter = void 0;
const express_1 = __importDefault(require("express"));
const roomsRouter = express_1.default.Router();
exports.roomsRouter = roomsRouter;
roomsRouter.get("/", (_req, res) => {
    const rooms = { sampleRoom: "sampleRoom" };
    res.header("Content-Type", "application/json");
    res.send(`${JSON.stringify(rooms, null, 4)}`);
});
//# sourceMappingURL=rooms.js.map