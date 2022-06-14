"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = __importDefault(require("express"));
const usersRouter = express_1.default.Router();
exports.usersRouter = usersRouter;
usersRouter.get("/", (_req, res) => {
    const users = { sampleUser: "sampleUser" };
    res.header("Content-Type", "application/json");
    res.send(`${JSON.stringify(users, null, 4)}`);
});
//# sourceMappingURL=users.js.map