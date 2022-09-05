import { ControllerResponse, DataFromServer, Room } from "src/types/types";
import { getUser } from "../userController";
import { getRoom } from "./getRoom";
import api from "../../utils/api";

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
}: DataFromServer): Promise<ControllerResponse<boolean>> => {
  const user = await getUser(currentUserId, redis!);
  const room = await getRoom(user?.currentRoom!, redis!);

  if (
    room?.config.adminUserId !== currentUserId ||
    room.state.currMemberCount < 2 ||
    Object.keys(room.teams).length < 2 ||
    !atLeastPerTeam(room) ||
    room.competition.contestStartedAt ||
    room?.competition.veto.isOngoing
  ) {
    return { error: "Room doesn't meet the requirements." };
  }

  console.log(`Competition starting for room: ${room.config.id}`);
  // TODO:
  // 1. stopTimers = {}

  // get random veto questions ids from api
  const vetoQuestionIds = await api.getRandomQuestionIds(
    room.competition.veto.questionCount
  );
  console.log(vetoQuestionIds);

  return { data: true };
};
