import { ClientToServerEvents, ServerToClientEvents } from "@coderoyale/common";
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

export type RoomTimer = {
  competitionTimer: ReturnType<typeof setTimeout> | null;
  vetoTimer: ReturnType<typeof setTimeout> | null;
};

export type SocketUser = {
  userId: number;
  socketId: string;
  currentRoom: string | null;
  currentTeam: string | null;
  hasActiveConnection: boolean;
};

export type DataFromServer = {
  socket: Socket<ClientToServerEvents, ServerToClientEvents>;
  io?: Server<ClientToServerEvents, ServerToClientEvents>;
  currentUserId: number;
  redis?: Redis;
};

export type ControllerResponse<T> = {
  error?: string;
  data?: T;
};

export type FieldError = {
  field: string;
  message: string;
};
