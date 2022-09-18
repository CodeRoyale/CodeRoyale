import { ControllerResponse, Room } from "@coderoyale/common";
import { DataFromServer } from "src/types/types";
import { getUser } from "../userController";
import { getRoom } from "./getRoom";
import { getRoomTimer } from "./getRoomTimer";
import { updateRoom } from "./updateRoom";

export const registerVotes = async (
  votedQuestionIds: number[],
  { redis, currentUserId, socket, io }: DataFromServer
): Promise<ControllerResponse<Room>> => {
  const user = await getUser(currentUserId, redis!);
  const room = await getRoom(user?.currentRoom!, redis!);

  if (!room) {
    return {
      error: "Room does not exist",
    };
  }

  const {
    isOngoing: vetoIsOngoing,
    votedUserIds,
    maxVoteAllowed,
    votes,
  } = room.competition.veto;

  if (!vetoIsOngoing || votedUserIds.includes(currentUserId)) {
    console.log("vetoIsOngoing", vetoIsOngoing);
    console.log("votedUserIds.includes", votedUserIds.includes(currentUserId));
    console.log("votedUserIds: ", votedUserIds);
    console.log("currentUserId: ", currentUserId);
    return {
      error: "Voting is not allowed now",
    };
  }

  if (votedQuestionIds.length === 0) {
    return {
      error: "Votes cannot be empty",
    };
  }

  if (votedQuestionIds.length > maxVoteAllowed) {
    votedQuestionIds = votedQuestionIds.slice(0, maxVoteAllowed);
  }

  votedQuestionIds.forEach((questionId) => {
    votes[questionId] += 1;
  });
  room.competition.veto.yetToVoteUserIds =
    room.competition.veto.yetToVoteUserIds.filter(
      (userId) => userId !== currentUserId
    );
  votedUserIds.push(currentUserId);

  let totalVotesRequired = 0;
  Object.keys(room.teams).forEach((team) => {
    totalVotesRequired += room.teams[team].length;
  });

  const roomId = room.config.id;
  if (totalVotesRequired === votedUserIds.length) {
    room.competition.veto.isOngoing = false;
    // [[key: value]] format
    let results = Object.entries(votes);
    results = results
      .sort((a, b) => b[1] - a[1])
      .slice(0, room.competition.maxQuestions);
    // take only the questionIds
    const finalQuestionIds = results.map((ele) => parseInt(ele[0]));

    room.competition.questionIds = finalQuestionIds;
    await updateRoom(room, redis!);

    const roomTimer = await getRoomTimer(roomId, redis!);

    clearTimeout(roomTimer?.vetoTimer!);

    socket.to(roomId).emit("roomUpdated", room);
    socket.to(roomId).emit("receiveChatMessage", {
      type: "ROOM_ALERT_MESSAGE",
      fromUserId: currentUserId,
      message: "has voted in veto",
    });
    io?.to(roomId).emit("vetoStopped", room);

    return { data: room };
  }

  await updateRoom(room, redis!);

  socket.to(roomId).emit("roomUpdated", room);
  socket.to(roomId).emit("receiveChatMessage", {
    type: "ROOM_ALERT_MESSAGE",
    fromUserId: currentUserId,
    message: "has voted in veto",
  });

  return {
    data: room,
  };
};
