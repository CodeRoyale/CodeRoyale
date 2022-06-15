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
const socket_io_1 = require("socket.io");
const main_1 = require("./routes/main");
const users_1 = require("./routes/users");
const rooms_1 = require("./routes/rooms");
const constants_1 = require("./utils/constants");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cookie_1 = __importDefault(require("cookie"));
const ioredis_1 = __importDefault(require("ioredis"));
const serverActions_1 = require("./socketActions/serverActions");
const main = async () => {
    const app = (0, express_1.default)();
    const server = http_1.default.createServer(app);
    const redis = new ioredis_1.default();
    app.use((0, cors_1.default)({
        origin: process.env.CORS_ORIGIN,
        credentials: false,
    }));
    app.use(express_1.default.json());
    app.use("/", main_1.mainRouter);
    app.use("/users", users_1.usersRouter);
    app.use("/rooms", rooms_1.roomsRouter);
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: process.env.CORS_ORIGIN,
            credentials: true,
        },
    });
    io.use(async (socket, next) => {
        const cookies = socket.request.headers.cookie;
        let parsedCookies;
        let unsignedCookie;
        let cookieData = null;
        if (cookies) {
            parsedCookies = cookie_1.default.parse(cookies);
            unsignedCookie = cookie_parser_1.default.signedCookie(parsedCookies[constants_1.COOKIE_NAME], process.env.SESSION_SECRET);
            const key = constants_1.SESSION_PREFIX + unsignedCookie;
            const result = await redis.get(key);
            cookieData = result ? JSON.parse(result) : null;
        }
        if (cookieData && cookieData.userId) {
            const userInRedis = await redis.get(constants_1.SOCKET_USER_PREFIX + cookieData.userId);
            if (userInRedis) {
                console.log(`userId:${cookieData.userId} reconnected`);
                return next();
            }
            const userObjInRedis = {
                userId: cookieData.userId,
                socketId: socket.id,
            };
            await redis.set(constants_1.SOCKET_USER_PREFIX + cookieData.userId, JSON.stringify(userObjInRedis));
            console.log(`userId:${cookieData.userId} connected`);
            socket.emit(serverActions_1.CONNECTION_ACK);
            next();
        }
        else {
            socket.emit(serverActions_1.CONNECTION_DENY);
            next(new Error("Not authenticated"));
        }
    });
    io.on("connection", (socket) => { });
    server.listen(process.env.PORT, () => {
        console.log(`Lobby Server running at - ${os_1.default.hostname()} on PORT : ${process.env.PORT}`);
    });
};
main().catch((error) => {
    console.log(error);
});
//# sourceMappingURL=index.js.map