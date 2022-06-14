import express, { Response } from "express";
// const { getUsersData } = require("../controllers/userController");

const usersRouter = express.Router();

usersRouter.get("/", (_req, res: Response) => {
  const users = { sampleUser: "sampleUser" };

  res.header("Content-Type", "application/json");
  res.send(`${JSON.stringify(users, null, 4)}`);
  //   res.send(
  //     `CodeRoyale Lobby Server is up and running. ${JSON.stringify(
  //       await getUsersData(),
  //       null,
  //       4
  //     )}`
  //   );
});

export { usersRouter };
