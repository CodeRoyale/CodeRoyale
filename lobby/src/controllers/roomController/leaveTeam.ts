import { Room } from "@coderoyale/common";
import { ControllerResponse, DataFromServer } from "../../types/types";
import { getUser, updateUser } from "../userController";
import { getRoom } from "./getRoom";
import { updateRoom } from "./updateRoom";

export const leaveTeam = async ({
  socket,
  redis,
  currentUserId,
}: DataFromServer): Promise<ControllerResponse<Room>> => {
  const user = await getUser(currentUserId, redis!);
  if (!user) {
    return { error: "User who tried to join the room does not exist" };
  }
  const room = await getRoom(user.currentRoom!, redis!);

  // check if user is present in a team
  if (!user.currentTeam) {
    return {
      error: "User is not part of a team",
    };
  }

  // filteredTeam implies the team without the current user who left the team
  const filteredTeam = room!.teams[user.currentTeam!].filter(
    (element) => element !== currentUserId
  );

  room!.teams[user.currentTeam!] = filteredTeam;
  room!.state.bench.push(currentUserId);
  room!.state.users[currentUserId].team = null;

  await updateRoom(room!, redis!);

  // notify the room through a alert message
  socket.to(user.currentRoom!).emit("receiveChatMessage", {
    type: "ROOM_ALERT_MESSAGE",
    fromUserId: currentUserId,
    message: `has left team ${user.currentTeam}`,
  });

  socket.leave(`${user.currentRoom}/${user.currentTeam}`);

  // emptying the currentTeam for the user
  user.currentTeam = null;
  await updateUser(user, redis!);
  socket.to(user.currentRoom!).emit("roomUpdated", room!);

  return { data: room! };
};
