import { z } from "zod";

// be VERY careful when changing something here since it is used in more than 2 places in the whole project
export type Room = {
  config: {
    id: string;
    title: string;
    creatorUsername: string;
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
    isOngoing: boolean;
    timeLimit: number;
    contestStartedAt: number | null;
    contestEndedAt: number | null;
    veto: {
      questionCount: number;
      questionIds: number[];
      maxVoteAllowed: number;
      isOngoing: boolean;
      timeLimit: number;
      votedUserIds: number[];
      votes: Record<number, number>;
    };
  };
  teams: Record<string, number[]>;
};

export type ControllerResponse<T> = {
  error?: string;
  data?: T;
};

export type FieldError = {
  field: string;
  message: string;
};

export const CreateRoomInputSchema = z.object({
  config: z.object({
    title: z
      .string()
      .trim()
      .min(2, { message: "Must be 2 or more characters long" })
      .max(50, { message: "Cannot be more than 50 characters" }),
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

export type CreateRoomInput = z.infer<typeof CreateRoomInputSchema>;

export type ZodValidationResponse = {
  errors?: FieldError[] | null;
  room?: Room | null;
};

export interface InviteToRoomInput {
  invitedUserId: number;
  invitedRoomId: string;
}

export interface CloseRoomInput {
  roomId: string;
  forceCloseRoom: boolean;
}

export const CreateTeamNameSchema = z
  .string()
  .trim()
  .min(2, { message: "Must be 2 or more characters long" })
  .max(20, { message: "Cannot be more than 20 characters" });

export type CreateTeamNameType = z.infer<typeof CreateTeamNameSchema>;

export const ChatMessageSchema = z
  .string()
  .trim()
  .min(2, { message: "Must be 2 or more characters long" })
  .max(350, { message: "Cannot exceed more than 350 characters" });

type ChatMessageType = z.infer<typeof ChatMessageSchema>;

export interface ChatInterface {
  message: ChatMessageType;
  toTeam: boolean;
}

export type ChatResponse = {
  errors?: FieldError[] | null;
  data?: boolean | null;
};

export interface ReceiveChatMessageInterface {
  fromUserId: number;
  type: "ROOM_CHAT_MESSAGE" | "ROOM_ALERT_MESSAGE";
  message: string;
  toTeam?: boolean;
}

// typesafe socket.io -> https://socket.io/docs/v4/typescript
export interface ServerToClientEvents {
  getRoomAfterConnection: (room: Room) => void;
  invitedToRoom: (data: { by: number; to: string }) => void;
  receiveChatMessage: (data: ReceiveChatMessageInterface) => void;
  roomUpdated: (room: Room) => void;
  roomClosed: () => void;
  userJoinedRoom: (data: { joineeUserId: number }) => void;
}

export interface ClientToServerEvents {
  createRoom: (
    createRoomInput: CreateRoomInput,
    callback: (e: ZodValidationResponse) => void
  ) => void;
  inviteToRoom: (
    inviteToRoomInput: InviteToRoomInput,
    callback: (e: boolean) => void
  ) => void;
  joinRoom: (
    roomId: string,
    callback: (e: ControllerResponse<Room>) => void
  ) => void;
  closeRoom: (
    closeRoom: CloseRoomInput,
    callback: (e: ControllerResponse<boolean>) => void
  ) => void;
  leaveRoom: (callback: (e: ControllerResponse<boolean>) => void) => void;
  createTeam: (
    teamName: CreateTeamNameType,
    callback: (e: ZodValidationResponse) => void
  ) => void;
  joinTeam: (
    teamName: string,
    callback: (e: ControllerResponse<Room>) => void
  ) => void;
  leaveTeam: (callback: (e: ControllerResponse<Room>) => void) => void;
  deleteTeam: (
    teamName: string,
    callback: (e: ControllerResponse<Room>) => void
  ) => void;
  sendChatMessage: (
    chatInput: ChatInterface,
    callback: (e: ChatResponse) => void
  ) => void;
}
