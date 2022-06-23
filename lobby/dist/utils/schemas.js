"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRoomInputSchema = void 0;
const zod_1 = require("zod");
exports.CreateRoomInputSchema = zod_1.z.object({
    config: zod_1.z.object({
        title: zod_1.z.string(),
        private: zod_1.z.boolean(),
        maxTeams: zod_1.z.number(),
        maxMembersPerTeam: zod_1.z.number(),
        maxMembers: zod_1.z.number(),
    }),
    competition: zod_1.z.object({
        timeLimit: zod_1.z.number(),
        maxQuestions: zod_1.z.number(),
    }),
    veto: zod_1.z.object({
        questionCount: zod_1.z.number(),
        maxVoteAllowed: zod_1.z.number(),
        timeLimit: zod_1.z.number(),
    }),
});
//# sourceMappingURL=schemas.js.map