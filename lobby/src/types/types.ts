import Redis from "ioredis";
import { Server, Socket } from "socket.io";
import { CreateRoomInputSchema } from "../utils/schemas";
import { z } from "zod";

export type RedisSessionCookie = {
  cookie: {
    originalMaxAge: number;
    expires: string;
    secure: boolean;
    httpOnly: boolean;
    path: string;
    sameSite: string;
  };
  userId: number;
};

export type Room = {
  config: {
    id: string;
    title: string;
    private: boolean;
    adminUserId: number;
    maxMembers: number;
    maxTeams: number;
    maxMembersPerTeam: number;
  };
  state: {
    currMemberCount: number;
    bannedMemberIds: number[];
    bench: number[]; // without a team
  };
  competition: {
    questionIds: number[];
    maxQuestions: number;
    isCompOn: boolean;
    timeLimit: number;
    contestStartedAt: Date | null;
    contestEndedAt: Date | null;
    veto: {
      questionCount: number;
      questionIds: number[];
      maxVoteAllowed: number;
      isVetoOn: boolean;
      timeLimit: number;
      votedUserIds: number[];
    };
  };
};

export type DataFromServer = {
  socket: Socket;
  io?: Server;
  currentUserId: number;
  redis?: Redis;
};

export type ControllerResponse<T> = {
  error?: string;
  data?: T;
};

export type ModelResponse<T> = {
  status: 0 | 1;
  error?: string;
  data?: T;
};

export type CreateRoomInput = z.infer<typeof CreateRoomInputSchema>;
