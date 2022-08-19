import { ROOM_CHAT_MSG } from "../../utils/constants";
import { RCV_MSG } from "../../socketActions/serverActions";
import { DataFromServer, FieldError } from "../../types/types";
import { getUser } from "../userController";
import { getRoom } from "./getRoom";
import { z } from "zod";

const ChatMessageSchema = z
  .string()
  .trim()
  .min(2, { message: "Must be 2 or more characters long" })
  .max(350, { message: "Cannot exceed more than 350 characters" });

type ChatMessageType = z.infer<typeof ChatMessageSchema>;

interface ChatInterface {
  message: ChatMessageType;
  toTeam: boolean;
}

type ChatResponse = {
  errors?: FieldError[] | null;
  data?: boolean | null;
};

export const chat = async (
  { message, toTeam }: ChatInterface,
  { socket, redis, currentUserId }: DataFromServer
): Promise<ChatResponse> => {
  // check input from client
  const checkChatMessageResult = ChatMessageSchema.safeParse(message);
  if (!checkChatMessageResult.success) {
    // TODO: need to find a better way
    return {
      errors: [
        {
          field: "message",
          message: checkChatMessageResult.error.issues[0].message,
        },
      ],
    };
  }

  const user = await getUser(currentUserId, redis!);
  if (!user) {
    return {
      errors: [
        {
          field: "Chat",
          message: "User who tried to chat in room doesn't exist",
        },
      ],
    };
  }

  const room = await getRoom(user.currentRoom!, redis!);
  if (!room) {
    return {
      errors: [
        {
          field: "Chat",
          message: `Room with roomId:${user.currentRoom} does not exist`,
        },
      ],
    };
  }

  if (!message) return { data: false };
  // todo: change the variable name of 'rcvrs'
  let rcvrs = user.currentRoom;

  if (toTeam && user.currentTeam) {
    rcvrs += `/${user.currentTeam}`;
  }

  socket.to(rcvrs!).emit(RCV_MSG, {
    fromUserId: currentUserId,
    type: ROOM_CHAT_MSG,
    message,
    toTeam,
  });
  return { data: true };
};
