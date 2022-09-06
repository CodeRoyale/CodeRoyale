// import Redis from "ioredis";
// import { Socket } from "socket.io";
// import { Room } from "src/types/types";
// import { updateRoom } from "./updateRoom";

// export const startVeto = ({
//   questionIds,
//   room,
//   maxQuestionCount,
//   socket,
//   redis,
// }: {
//   questionIds: number[];
//   room: Room;
//   maxQuestionCount: number;
//   socket: Socket;
//   redis: Redis;
// }) => {
//   return new Promise(async (resolve) => {
//     let state = "start";
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
//       questionIds.forEach((questionId) => {
//         room.competition.veto.votes[questionId] = 0;
//       });
//       await updateRoom(room, redis);
//     } else {
//       // no need to remove listeners
//       // all of them are volatile listeners
//       // calculate veto results
//       room.competition.veto.isOngoing = false;
//       // converting into array format like ['key': value]
//       let votes = Object.entries(room.competition.veto.votes);
//       // sort in descending order and slicing using maxQuestionCount
//       votes = votes.sort((a, b) => b[1] - a[1]).slice(0, maxQuestionCount);
//       // take only the questionIds
//       const results = votes.map((ele) => ele[0]);

//       // converting the string[] from above into an number[]
//       const integerResults: number[] = [];
//       results.forEach((result) => integerResults.push(parseInt(result)));

//       room.competition.questionIds = integerResults;

//       await updateRoom(room, redis);
//     }
//   });
// };
