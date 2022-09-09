import { ControllerResponse, DataFromServer } from "../../types/types";
import { Room } from "@coderoyale/common";
import { getUser, updateUser } from "../userController";
import { getRoom } from "./getRoom";
import { updateRoom } from "./updateRoom";

export const deleteTeam = async (
  teamName: string,
  { socket, redis, currentUserId }: DataFromServer
): Promise<ControllerResponse<Room>> => {
  const user = await getUser(currentUserId, redis!);
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

  await updateRoom(room, redis!);

  socket.to(user.currentRoom!).emit("roomUpdated", room);
  socket.to(user.currentRoom!).emit("receiveChatMessage", {
    type: "ROOM_ALERT_MESSAGE",
    fromUserId: currentUserId,
    message: `has deleted team ${teamName}`,
  });

  return { data: room };
};
