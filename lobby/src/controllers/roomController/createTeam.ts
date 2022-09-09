import {
  CreateTeamNameSchema,
  CreateTeamNameType,
  ZodValidationResponse,
} from "@coderoyale/common";
import { DataFromServer } from "../../types/types";
import { getUser } from "../userController";
import { getRoom } from "./getRoom";
import { updateRoom } from "./updateRoom";

export const createTeam = async (
  teamName: CreateTeamNameType,
  { socket, redis, currentUserId }: DataFromServer
): Promise<ZodValidationResponse> => {
  // check input from client
  const checkInputResult = CreateTeamNameSchema.safeParse(teamName);
  if (!checkInputResult.success) {
    // TODO: need to find a better way
    return {
      errors: [
        {
          field: "teamName",
          message: checkInputResult.error.issues[0].message,
        },
      ],
    };
  }

  const user = await getUser(currentUserId, redis!);
  if (!user) {
    return {
      errors: [
        {
          field: "CreateTeam",
          message: "User who tried to create the team does not exist!",
        },
      ],
    };
  }

  const room = await getRoom(user.currentRoom!, redis!);

  if (!room) {
    return {
      errors: [
        {
          field: "CreateTeam",
          message: `Room with roomId:${user.currentRoom} does not exist`,
        },
      ],
    };
  }

  // If user not in room or is not admin of the room
  if (!user.currentRoom || room.config.adminUserId !== currentUserId) {
    return {
      errors: [
        {
          field: "CreateTeam",
          message: "Only admin can do this",
        },
      ],
    };
  }

  // If teams in room exceed the max team limit
  // If team is already created before
  if (
    Object.keys(room.teams).length > room.config.maxTeams &&
    room.teams[teamName]
  ) {
    return {
      errors: [
        {
          field: "CreateTeam",
          message:
            "The team name has already been alloted or the team is already in",
        },
      ],
    };
  }

  room.teams[teamName] = [];
  await updateRoom(room, redis!);

  socket.to(user.currentRoom).emit("roomUpdated", room);
  socket.to(user.currentRoom!).emit("receiveChatMessage", {
    type: "ROOM_ALERT_MESSAGE",
    fromUserId: currentUserId,
    message: `has created team ${teamName}`,
  });

  return { room };
};
