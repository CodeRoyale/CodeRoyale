import "dotenv/config";
import express from "express";
import cors from "cors";
import os from "os";
import http from "http";
import { Server } from "socket.io";
import { mainRouter } from "./routes/main";
import { usersRouter } from "./routes/users";
import { roomsRouter } from "./routes/rooms";
import { COOKIE_NAME, SESSION_PREFIX, __prod__ } from "./utils/constants";
import cookieParser from "cookie-parser";
import cookie from "cookie";
import Redis from "ioredis";
import { RedisSessionCookie } from "./types/types";
import { handleUserEvents } from "./controllers/socketController";
import { instrument } from "@socket.io/admin-ui";
import { addUser } from "./controllers/userController";
import { deleteUser } from "./controllers/userController";

const main = async () => {
  // create server using http
  // we need to use http here for socket.io
  const app = express();
  const server = http.createServer(app);

  const redis = new Redis();

  // middlewares
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      // no need for cookies
      credentials: false,
    })
  );
  app.use(express.json());

  // Routes
  app.use("/", mainRouter);
  app.use("/users", usersRouter);
  app.use("/rooms", roomsRouter);

  // cors for socket.io
  const io = new Server(server, {
    cors: {
      origin: [
        process.env.CORS_ORIGIN,
        process.env.SOCKET_ADMIN_DASHBOARD_ORIGIN,
      ],
      credentials: true,
    },
  });

  // user id of current user connected
  let currentUserId: number;

  // only allow authenticated users
  io.use(async (socket, next) => {
    const cookies = socket.request.headers.cookie;
    let parsedCookies;
    let unsignedCookie;
    let cookieData: RedisSessionCookie | null = null;
    if (cookies) {
      parsedCookies = cookie.parse(cookies);
      // unsign cookie
      unsignedCookie = cookieParser.signedCookie(
        parsedCookies[COOKIE_NAME],
        process.env.SESSION_SECRET
      );
      // verifying user session in redis
      const key = SESSION_PREFIX + unsignedCookie;
      const result = await redis.get(key);
      cookieData = result ? JSON.parse(result) : null;
      currentUserId = cookieData?.userId!;
    }

    // user is authentic and logged in
    if (cookieData && cookieData.userId) {
      const user = await addUser(
        {
          userId: cookieData.userId,
          currentRoom: null,
          socketId: socket.id,
        },
        redis
      );

      if (user) {
        next();
      }
    } else {
      next(new Error("Not authenticated"));
    }
  });

  io.on("connection", (socket) => {
    handleUserEvents({ socket, io, redis, currentUserId });
    socket.on("disconnect", async () => {
      // delete the user from cache
      const result = await deleteUser(currentUserId, redis);

      if (result) {
        console.log(`userId:${currentUserId} disconnected`);
      }
    });
  });

  instrument(io, {
    auth: false,
  });

  // start listening
  server.listen(process.env.PORT, () => {
    console.log(
      `Lobby Server running at - ${os.hostname()} on PORT : ${process.env.PORT}`
    );
  });
};

main().catch((error) => {
  console.log(error);
});
