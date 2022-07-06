import { DataFromServer, Room } from "../../types/types";
import RoomModel from "../../models/roomModel";
import { SOCKET_USER_PREFIX } from "../../utils/constants";
import { z } from "zod";

const CreateRoomInputSchema = z.object({
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

type FieldError = {
  field: string;
  message: string;
};

type CreateRoomResponse = {
  errors?: FieldError[] | null;
  room?: Room | null;
};

export const createRoom = async (
  createRoomInput: CreateRoomInput,
  { socket, redis, currentUserId }: DataFromServer
): Promise<CreateRoomResponse> => {
  // check input from client
  const checkInputresult = CreateRoomInputSchema.safeParse(createRoomInput);
  if (!checkInputresult.success) {
    // need to find a better way to do this...this works for now
    return {
      errors: [
        {
          field: checkInputresult.error.issues[0].path[1].toString(),
          message: checkInputresult.error.issues[0].message,
        },
      ],
    };
  }

  // find user in redis
  let user;
  const userInRedis = await redis?.get(SOCKET_USER_PREFIX + currentUserId);
  if (userInRedis) {
    user = JSON.parse(userInRedis);
  }
  // disabled for testing, have to re enable
  // if (user.currentRoom) {
  //   // user already in a room, must leave room to create a new room
  //   return {
  //     error: "You are already in a room, leave to create a new room.",
  //   };
  // }
  // createRoom logic (user is not in a room and hence can continue creating a room)
  const roomObj = await RoomModel.createRoom(
    createRoomInput,
    currentUserId,
    redis!
  );
  if (roomObj.status === 0) {
    return {
      errors: [
        {
          field: "CreateRoom",
          message: roomObj.error ? roomObj.error : "Create room failed",
        },
      ],
    };
  }

  // now put current user into the room
  const roomId = roomObj.data?.config.id;
  user = {
    ...user,
    currentRoom: roomId,
  };
  await redis?.set(SOCKET_USER_PREFIX + user.userId, JSON.stringify(user));
  // created room
  socket.join(roomId!);
  return { room: roomObj.data };
};
