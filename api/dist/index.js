"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
const apollo_server_core_1 = require("apollo-server-core");
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const os_1 = __importDefault(require("os"));
const type_graphql_1 = require("type-graphql");
const hello_1 = require("./resolvers/hello");
const constants_1 = require("./utils/constants");
const typeormConfig_1 = require("./utils/typeormConfig");
const connect_redis_1 = __importDefault(require("connect-redis"));
const express_session_1 = __importDefault(require("express-session"));
const ioredis_1 = __importDefault(require("ioredis"));
const user_1 = require("./resolvers/user");
const cors_1 = __importDefault(require("cors"));
const main = async () => {
    await typeormConfig_1.dataSource.initialize();
    const app = (0, express_1.default)();
    const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    const redis = new ioredis_1.default();
    app.use((0, cors_1.default)({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }));
    app.use((0, express_session_1.default)({
        name: constants_1.COOKIE_NAME,
        store: new RedisStore({
            client: redis,
            disableTouch: true,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: "lax",
            secure: constants_1.__prod__,
        },
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET,
        resave: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [hello_1.HelloResolver, user_1.UserResolver],
            validate: false,
        }),
        plugins: [
            constants_1.__prod__
                ? (0, apollo_server_core_1.ApolloServerPluginLandingPageDisabled)()
                : apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground,
        ],
        context: ({ req, res }) => ({
            req,
            res,
            dataSource: typeormConfig_1.dataSource,
        }),
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false });
    app.listen(process.env.PORT, () => {
        console.log(`@coderoyale/api running at ${os_1.default.hostname} at port ${process.env.PORT}`);
    });
};
main().catch((error) => {
    console.log(error);
});
//# sourceMappingURL=index.js.map