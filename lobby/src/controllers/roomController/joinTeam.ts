import { ControllerResponse, DataFromServer } from "../../types/types";
import { getUser } from "../userController/getUser";
import { getRoom } from "./getRoom";

export const joinTeam = async (teamName: string, { socket, redis, currentUserId }: DataFromServer): Promise<ControllerResponse<Room>> => {
    const user = await getUser(currentUserId, redis!);
    if (!user) {
        return { error: "User who tried to join the team does not exist" };
    }

    const room = await getRoom(user.currentRoom!, redis!);
    // Only run if room exists and user is in that room
    // and there is space
    if (
        !room &&
        !room.teams[teamName] &&
        room.teams[teamName].length > room.config.maxPerTeam
      ) {
        return {
          error: "The User doesn't meet the specifications to join the team",
        };
      }
    return { data: room }; 
}