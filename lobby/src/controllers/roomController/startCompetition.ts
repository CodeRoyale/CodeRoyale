import { ControllerResponse, DataFromServer, Room } from "src/types/types";
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

  console.log(`Competition starting for room: ${room.config.id}`);
  const roomTimer = await getRoomTimer(room.config.id, redis!);

  // get random veto questions ids from api
  const vetoQuestionIds = await api.getRandomQuestionIds(
    room.competition.veto.questionCount
  );

  try {
    await startVeto(vetoQuestionIds, room, socket, redis!);
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

  socket.to(room.config.id).emit("COMPETITION_STARTED", room);
  socket.emit("COMPETITION_STARTED", room);

  roomTimer!.competitionTimer = setTimeout(async () => {
    room.competition.isOngoing = false;
    room.competition.contestEndedAt = Date.now();
    await updateRoom(room, redis!);
    socket.to(room.config.id).emit("COMPETITION_STOPPED", room);
    socket.emit("COMPETITION_STOPPED", room);
  }, room.competition.timeLimit);

  return { data: true };
};
