import { ControllerResponse, DataFromServer, Room } from "src/types/types";
import { getUser } from "../userController";
import { getRoom } from "./getRoom";
import api from "../../utils/api";
import { startVeto } from "./startVeto";
import { updateRoom } from "./updateRoom";
import Redis from "ioredis";

// this is temporary will replace with redis
const stopTimers: any = {};

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

const initializeCompetition = async (
  room: Room,
  state: string,
  redis: Redis
) => {
  if (state === "start") {
    room.competition.isOngoing = true;
    // TODO room.competition.contestStartedAt = Date.now();
    Object.keys(room.teams).forEach((ele) => {
      console.log(ele);
      // TODO room.competition.scoreboard[ele] = [];
    });
    await updateRoom(room, redis);
  } else {
    room.competition.isOngoing = false;
    // TODO room.competition.contestEndedAt = Date.now();
    await updateRoom(room, redis);
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
  stopTimers[room.config.id] = {};

  // get random veto questions ids from api
  const vetoQuestionIds = await api.getRandomQuestionIds(
    room.competition.veto.questionCount
  );

  await startVeto(vetoQuestionIds, room, socket, redis!);
  let state = "start";
  await initializeCompetition(room, state, redis!);

  socket.to(room.config.id).emit("COMPETITION_STARTED", room);
  socket.emit("COMPETITION_STARTED", room);

  state = "stop";
  stopTimers[room.config.id].competitionTimer = setTimeout(async () => {
    await initializeCompetition(room, state, redis!);
    socket.to(room.config.id).emit("COMPETITION_STOPPED", room);
    socket.emit("COMPETITION_STOPPED", room);
  }, room.competition.timeLimit);

  return { data: true };
};
