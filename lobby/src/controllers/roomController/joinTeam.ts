import { JOINED_TEAM, ROOM_UPDATED } from "src/socketActions/serverActions";
import { ROOM_PREFIX } from "src/utils/constants";
import { ControllerResponse, DataFromServer, Room } from "../../types/types";
import { updateUser } from "../userController";
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
    !room!.teams[teamName] &&
    room!.teams[teamName].length > room!.config.maxMembersPerTeam
  ) {
    return {
      error: "The User doesn't meet the specifications to join the team",
    };
  }
  if (user.currentTeam) {
    // ditch prev team
    return { error: 'Already in team' };
  }
  
  // remove from bench
  const newBench = room?.state.bench.filter(
    (ele) => ele !== currentUserId
  );

  if (room) {
    room.state.bench = newBench!;
  }

  // Push user into team
  room!.teams[teamName].push(currentUserId);
  user.currentTeam = teamName;

  await redis?.set(ROOM_PREFIX + user.currentRoom, JSON.stringify(room));
  await updateUser(user, redis!);

  socket.join(`${user.currentRoom}/${teamName}`);
  socket.to(user.currentRoom!).emit(ROOM_UPDATED, {
    type: JOINED_TEAM,
    data: room,
  });
  
  return { data: room! };
}