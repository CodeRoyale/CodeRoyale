import express, { Response } from "express";

const mainRouter = express.Router();

mainRouter.get("/", (_req, res: Response) => {
  res.send(`CodeRoyale Lobby Server is up and running`);
});

export { mainRouter };
