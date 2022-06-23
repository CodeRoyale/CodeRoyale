// something that typeorm and type-graphql requires to work
import "reflect-metadata";
import "dotenv/config";
import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import os from "os";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { MyContext } from "./types/types";
import { COOKIE_NAME, __prod__ } from "./utils/constants";
import { dataSource } from "./utils/typeormConfig";
import connectRedis from "connect-redis";
import session from "express-session";
import Redis from "ioredis";
import { UserResolver } from "./resolvers/user";
import cors from "cors";
import { RoomResolver } from "./resolvers/room";

const main = async () => {
  await dataSource.initialize();
  // await connection.runMigrations();

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );

  // apollo server init
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver, RoomResolver],
      validate: false,
    }),
    plugins: [
      __prod__
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground,
    ],
    context: ({ req, res }): MyContext => ({
      req,
      res,
      dataSource,
    }),
  });

  await apolloServer.start();

  // disabling cors since if enabled it will only be available for apollo server
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(process.env.PORT, () => {
    console.log(
      `@coderoyale/api running at ${os.hostname} at port ${process.env.PORT}`
    );
  });
};

main().catch((error) => {
  console.log(error);
});
