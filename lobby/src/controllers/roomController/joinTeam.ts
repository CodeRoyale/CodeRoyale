import { Room } from "@coderoyale/common";
import { ControllerResponse, DataFromServer } from "../../types/types";
import { updateUser } from "../userController";
import { getUser } from "../userController/getUser";
import { getRoom } from "./getRoom";
import { updateRoom } from "./updateRoom";

export const joinTeam = async (
  teamName: string,
  { socket, redis, currentUserId }: DataFromServer
): Promise<ControllerResponse<Room>> => {
  const user = await getUser(currentUserId, redis!);
  if (!user) {
    return { error: "User who tried to join the team does not exist" };
  }

  // Only run if room exists and user is in that room
  // and there is space
  const room = await getRoom(user.currentRoom!, redis!);
  if (!room) return { error: "The room was not found!" };

  // check if the team was found for the user to join
  if (!room!.teams[teamName])
    return { error: "The team was not found for the user to join!" };

  // check if the team has space in it
  if (room!.teams[teamName].length > room!.config.maxMembersPerTeam)
    return {
      error:
        "Cannot join the team as the team has reached it's limit of max members",
    };

  if (user.currentTeam) {
    // ditch prev team
    return { error: "Already in team" };
  }

  // remove from bench
  const newBench = room?.state.bench.filter((ele) => ele !== currentUserId);

  if (room) {
    room.state.bench = newBench!;
  }

  // Push user into team
  room.teams[teamName].push(currentUserId);
  room.state.users[currentUserId].team = teamName;
  user.currentTeam = teamName;

  await updateRoom(room, redis!);
  await updateUser(user, redis!);

  socket.join(`${user.currentRoom}/${teamName}`);
  socket.to(user.currentRoom!).emit("roomUpdated", room);
  socket.to(user.currentRoom!).emit("receiveChatMessage", {
    type: "ROOM_ALERT_MESSAGE",
    fromUserId: currentUserId,
    message: `has joined team ${teamName}`,
  });

  return { data: room };
};
