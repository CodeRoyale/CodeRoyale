import { z } from "zod";

export const CreateRoomInputSchema = z.object({
  config: z.object({
    title: z.string(),
    private: z.boolean(),
    maxTeams: z.number(),
    maxMembersPerTeam: z.number(),
    maxMembers: z.number(),
  }),
  competition: z.object({
    timeLimit: z.number(),
    maxQuestions: z.number(),
  }),
  veto: z.object({
    questionCount: z.number(),
    maxVoteAllowed: z.number(),
    timeLimit: z.number(),
  }),
});
