import Redis from "ioredis";
import { Server, Socket } from "socket.io";

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

export type SocketUser = {
  userId: number;
  socketId: string;
  currentRoom: string | null;
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
