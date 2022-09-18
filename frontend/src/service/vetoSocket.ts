import { ControllerResponse, Room } from "@coderoyale/common";
import { ISocket } from "../modules/ws/WebSocketProvider";
import { NO_CONNECTION } from "../utils/constants";

export const registerVotes = (
  socket: ISocket,
  votedQuestionIds: number[]
): Promise<ControllerResponse<Room>> => {
  return new Promise((resolve, reject) => {
    if (!socket) {
      reject(NO_CONNECTION);
    } else {
      socket.emit("registerVotes", votedQuestionIds, (res) => {
        console.log("registerVotes: ", res);
        if (res.error) {
          reject(res);
        } else {
          resolve(res);
        }
      });
    }
  });
};
