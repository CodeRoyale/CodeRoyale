import Redis from "ioredis";
import {
  ClientToServerEvents,
  Room,
  ServerToClientEvents,
} from "@coderoyale/common";
import { getRoomTimer } from "./getRoomTimer";
import { updateRoom } from "./updateRoom";
import { Server } from "socket.io";

export const startVeto = (
  questionIds: number[],
  room: Room,
  io: Server<ClientToServerEvents, ServerToClientEvents>,
  redis: Redis
) => {
  return new Promise(async (resolve, reject) => {
    const roomId = room.config.id;
    const roomTimer = await getRoomTimer(roomId, redis);

    if (room.competition.isOngoing) {
      reject(new Error("Veto is already completed"));
    }

    if (room.competition.veto.isOngoing) {
      reject(new Error("Veto is still going on"));
    }

    room.competition.veto.isOngoing = true;
    room.competition.veto.questionIds = questionIds;

    Object.keys(room.teams).forEach((team) => {
      room.teams[team].forEach((teamMemberId) => {
        room.competition.veto.yetToVoteUserIds.push(teamMemberId);
      });
    });

    // initialize votes with 0
    questionIds.forEach((questionId) => {
      room.competition.veto.votes[questionId] = 0;
    });

    await updateRoom(room, redis!);

    io.to(roomId).emit("vetoStarted", room);

    roomTimer!.vetoTimer = setTimeout(async () => {
      // calculate veto results
      room.competition.veto.isOngoing = false;

      // Calculate the veto votes
      // converting into array format like ['key': value]
      let votes = Object.entries(room.competition.veto.votes);
      // sort in descending order and slicing using maxQuestionCount
      votes = votes
        .sort((a, b) => b[1] - a[1])
        .slice(0, room.competition.maxQuestions);

      // take only the questionIds
      const results = votes.map((ele) => ele[0]);
      // converting the string[] from above into an number[]
      const integerResults: number[] = [];
      results.forEach((result) => integerResults.push(parseInt(result)));
      room.competition.questionIds = integerResults;

      await updateRoom(room, redis!);

      io.to(roomId).emit("vetoStopped", room);

      resolve(room.competition.questionIds);
    }, room.competition.veto.timeLimit);
  });
};
