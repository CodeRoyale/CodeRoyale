import express, { Response } from "express";
// const { getRoomsData } = require("../controllers/roomController");

const roomsRouter = express.Router();

roomsRouter.get("/", (_req, res: Response) => {
  const rooms = { sampleRoom: "sampleRoom" };
  // const rooms = getRoomsData();
  // making it string friendly
  // rooms.competition.timer = "[TIMER]";
  // rooms.competition.veto.timer = "[TIMER]";
  // rooms.competition.veto.resolver = "[RESOLVER]";

  res.header("Content-Type", "application/json");
  res.send(`${JSON.stringify(rooms, null, 4)}`);
});

export { roomsRouter };
