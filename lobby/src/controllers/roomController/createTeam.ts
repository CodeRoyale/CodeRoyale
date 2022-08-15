import { ROOM_UPDATED, TEAM_CREATED } from "../../socketActions/serverActions";
import { DataFromServer, Room } from "../../types/types";
import { ROOM_PREFIX } from "../../utils/constants";
import { getUser } from "../userController";
import { z } from "zod";
import { getRoom } from "./getRoom";

const TeamNameSchema = z
  .string()
  .trim()
  .min(2, { message: "Must be 2 or more characters long" })
  .max(20, { message: "Cannot be more than 20 characters" });

type TeamNameType = z.infer<typeof TeamNameSchema>;

type FieldError = {
  field: string;
  message: string;
};

type CreateTeamResponse = {
  errors?: FieldError[] | null;
  room?: Room | null;
};

export const createTeam = async (
  teamName: TeamNameType,
  { socket, redis, currentUserId }: DataFromServer
): Promise<CreateTeamResponse> => {
  // check input from client
  const checkInputResult = TeamNameSchema.safeParse(teamName);
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

  if (!room){
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
  await redis?.set(ROOM_PREFIX + user.currentRoom, JSON.stringify(room));

  socket.to(user.currentRoom).emit(ROOM_UPDATED, {
    type: TEAM_CREATED,
    data: { teamName },
  });

  return { room };
};
