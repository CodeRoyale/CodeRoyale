import "dotenv/config";
import express from "express";
import cors from "cors";
import os from "os";
import http from "http";
// import socketio from "socket.io";
import { mainRouter } from "./routes/main";
import { usersRouter } from "./routes/users";
import { roomsRouter } from "./routes/rooms";

const main = async () => {
  // create server using http
  // we need to use http here for socket.io
  const app = express();
  const server = http.createServer(app);

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
