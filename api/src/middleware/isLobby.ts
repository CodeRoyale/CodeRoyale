import { MyContext } from "src/types/types";
import { MiddlewareFn } from "type-graphql";

export const isLobby: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (
    !context.req.headers["lobby-secret"] &&
    context.req.headers["lobby-secret"] !== process.env.LOBBY_SECRET
  ) {
    throw new Error("Only lobby allowed to do this");
  }

  // all good, this is lobby!
  return next();
};
