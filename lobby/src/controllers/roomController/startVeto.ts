// import Redis from "ioredis";
// import { Socket } from "socket.io";
// import { Room } from "src/types/types";
// import { updateRoom } from "./updateRoom";

// export const startVeto = ({
//   questionIds,
//   room,
//   maxQuestionsCount,
//   socket,
//   redis,
// }: {
//   questionIds: number[];
//   room: Room;
//   maxQuestionsCount: number;
//   socket: Socket;
//   redis: Redis;
// }) => {
//   return new Promise(async (resolve) => {
//     const state = "start";
//     if (room.competition.isOngoing) {
//       return { error: "Veto has been already completed!" };
//     }
//     if (room.competition.veto.isOngoing) {
//       return { error: "Veto is on going!" };
//     }
//     if (state === "start") {
//       room.competition.veto.isOngoing = true;
//       room.competition.veto.questionIds = questionIds;

//       // initialize votes with 0
//       room.competition.veto.votedUserIds = [];
//       // TODO 1. room.competition.veto.voted = [];
//       // TODO 2. questionIds.forEach((id) => {
//       //     room.competition.veto.votes[id] = 0;
//       //   });
//       await updateRoom(room, redis);
//     }

//     // no need to remove listeners
//     // all of them are volatile listeners
//     // calculate veto results

//     room.competition.veto.isOngoing = false;
//     // TODO let votes = Object.entries(room.competition.veto.votes);
//     // results = results.sort((a, b) => b[1] - a[1]).slice(0, count);
//     // take only qids
//     // results = results.map((ele) => ele[0]);

//     // TODO room.competition.questionIds = votes;

//     await updateRoom(room, redis!);
//   });
// };
