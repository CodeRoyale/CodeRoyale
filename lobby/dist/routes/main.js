"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
const express_1 = __importDefault(require("express"));
const mainRouter = express_1.default.Router();
exports.mainRouter = mainRouter;
mainRouter.get("/", (_req, res) => {
    res.send(`CodeRoyale Lobby Server is up and running`);
});
//# sourceMappingURL=main.js.map