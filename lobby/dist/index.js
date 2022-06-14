"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const os_1 = __importDefault(require("os"));
const http_1 = __importDefault(require("http"));
const main_1 = require("./routes/main");
const users_1 = require("./routes/users");
const rooms_1 = require("./routes/rooms");
const main = async () => {
    const app = (0, express_1.default)();
    const server = http_1.default.createServer(app);
    app.use((0, cors_1.default)({
        origin: process.env.CORS_ORIGIN,
        credentials: false,
    }));
    app.use(express_1.default.json());
    app.use("/", main_1.mainRouter);
    app.use("/users", users_1.usersRouter);
    app.use("/rooms", rooms_1.roomsRouter);
    server.listen(process.env.PORT, () => {
        console.log(`Lobby Server running at - ${os_1.default.hostname()} on PORT : ${process.env.PORT}`);
    });
};
main().catch((error) => {
    console.log(error);
});
//# sourceMappingURL=index.js.map