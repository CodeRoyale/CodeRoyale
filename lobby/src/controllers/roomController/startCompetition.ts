import { ControllerResponse, DataFromServer } from "../../types/types";
import { Room } from "@coderoyale/common";
import { getUser } from "../userController";
import { getRoom } from "./getRoom";
import api from "../../utils/api";
import { startVeto } from "./startVeto";
import { updateRoom } from "./updateRoom";
import { getRoomTimer } from "./getRoomTimer";

// checks if a team is of minSize
const atLeastPerTeam = (room: Room, minSize = 1) => {
  // 0 -> number of members in team is less than the minSize
  // 1 -> all good

  const results: 0[] & 1[] = [];
  Object.values(room.teams).forEach((teamMembers: any) => {
    if (teamMembers.length < minSize) {
      results.push(0);
    } else {
      results.push(1);
    }
  });

  if (results.includes(0)) {
    return false;
  } else {
    return true;
  }
};

export const startCompetition = async ({
  redis,
  currentUserId,
  socket,
  io,
}: DataFromServer): Promise<ControllerResponse<boolean>> => {
  const user = await getUser(currentUserId, redis!);
  const room = await getRoom(user?.currentRoom!, redis!);

  if (
    !room ||
    room.config.adminUserId !== currentUserId ||
    room.state.currMemberCount < 2 ||
    Object.keys(room.teams).length < 2 ||
    !atLeastPerTeam(room, 1) ||
    room.competition.isOngoing ||
    room?.competition.veto.isOngoing
  ) {
    return { error: "Room doesn't meet the requirements." };
  }

  const roomId = room.config.id;

  console.log(`Competition starting for room: ${roomId}`);
  socket.to(roomId).emit("receiveChatMessage", {
    type: "ROOM_ALERT_MESSAGE",
    fromUserId: currentUserId,
    message: "is starting the competition! All the best!",
  });
  const roomTimer = await getRoomTimer(roomId, redis!);

  // get random veto questions ids from api
  const getRandomQuestionIdsRes = await api.getRandomQuestionIds(
    room.competition.veto.questionCount
  );

  try {
    // getting the array of questionIds
    const vetoQuestionIds = getRandomQuestionIdsRes.getRandomQuestionIds;
    await startVeto(vetoQuestionIds, room, io!, redis!);
  } catch (error) {
    console.log(error.message);
    return { error: error.message };
  }

  room.competition.isOngoing = true;
  room.competition.contestStartedAt = Date.now();
  Object.keys(room.teams).forEach((ele) => {
    console.log(ele);
    // TODO room.competition.scoreboard[ele] = [];
  });
  await updateRoom(room, redis!);

  socket.to(roomId).emit("competitionStarted", room);
  // socket.emit("COMPETITION_STARTED", room);

  roomTimer!.competitionTimer = setTimeout(async () => {
    room.competition.isOngoing = false;
    room.competition.contestEndedAt = Date.now();
    await updateRoom(room, redis!);
    socket.to(roomId).emit("competitionStopped");
    // socket.emit("COMPETITION_STOPPED", room);
  }, room.competition.timeLimit);

  return { data: true };
};
