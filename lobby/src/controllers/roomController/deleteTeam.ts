import { RCV_MSG, ROOM_UPDATED } from "../../socketActions/serverActions";
import { DELETE_TEAM } from "../../socketActions/userActions";
import { ROOM_ALERT_MSG, ROOM_PREFIX } from "../../utils/constants";
import { ControllerResponse, DataFromServer, Room } from "../../types/types";
import { getUser, updateUser } from "../userController";
import { getRoom } from "./getRoom";

export const deleteTeam = async (
  teamName: string,
  { socket, redis, currentUserId }: DataFromServer
): Promise<ControllerResponse<Room>> => {
  const user = await getUser(currentUserId!, redis!);
  if (!user) {
    return { error: "The user wanting to delete the team doesn't exist" };
  }

  const room = await getRoom(user.currentRoom!, redis!);
  if (!room) {
    return { error: `Room with roomId:${user.currentRoom} does not exist` };
  }

  // Check if the user is Admin
  if (room.config.adminUserId !== user.userId) {
    return { error: "The user doesn't have privileges to delete the team" };
  }

  // Check if the teamName exists
  if (!room.teams[teamName]) {
    return { error: "The team doesn't exist" };
  }

  let newBench = room.state.bench;
  const teamToDeleteMembers = room.teams[teamName];

  teamToDeleteMembers.forEach(async (teamMember) => {
    const teamUser = await getUser(teamMember, redis!);
    if (!teamUser?.currentTeam) {
      return;
    }
    socket.leave(`${teamUser.currentRoom}/${teamUser.currentTeam}`);
    teamUser.currentTeam = null;
    await updateUser(teamUser, redis!);
  });

  newBench = [...newBench, ...teamToDeleteMembers];

  room.state.bench = newBench;
  delete room.teams[teamName];

  await redis?.set(ROOM_PREFIX + user.currentRoom, JSON.stringify(room));

  socket.to(user.currentRoom!).emit(ROOM_UPDATED, {
    type: DELETE_TEAM,
    data: room,
  });
  socket.to(user.currentRoom!).emit(RCV_MSG, {
    type: ROOM_ALERT_MSG,
    fromUserId: currentUserId,
    message: `has deleted team ${teamName}`,
  });

  return { data: room };
};
