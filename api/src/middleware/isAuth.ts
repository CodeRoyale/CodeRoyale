import { MyContext } from "src/types/types";
import { MiddlewareFn } from "type-graphql";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error("Not authenticated");
  }

  // all good go on!
  return next();
};
