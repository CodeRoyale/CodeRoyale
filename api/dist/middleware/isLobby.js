"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLobby = void 0;
const isLobby = ({ context }, next) => {
    if (!context.req.headers["lobby-secret"] &&
        context.req.headers["lobby-secret"] !== process.env.LOBBY_SECRET) {
        throw new Error("Only lobby allowed to do this");
    }
    return next();
};
exports.isLobby = isLobby;
//# sourceMappingURL=isLobby.js.map