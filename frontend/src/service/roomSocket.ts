import { ISocket } from "../modules/ws/WebSocketProvider";
import { NO_CONNECTION } from "../utils/constants";

export const createRoom = (
  socket: ISocket,
  data: {
    title: string;
    private: boolean;
    maxMembers: number;
    maxTeams: number;
    maxMembersPerTeam: number;
    maxCompQuestions: number;
    compTimeLimit: number;
    vetoQuestionCount: number;
    maxVetoVotesAllowed: number;
    vetoTimeLimit: number;
  }
) => {
  return new Promise((resolve, reject) => {
    if (!socket) {
      reject(NO_CONNECTION);
    } else {
      socket.emit(
        "CREATE_ROOM",
        {
          config: {
            title: data.title,
            private: data.private,
            maxTeams: data.maxTeams,
            maxMembersPerTeam: data.maxMembersPerTeam,
            maxMembers: data.maxMembers,
          },
          competition: {
            timeLimit: data.compTimeLimit,
            maxQuestions: data.maxCompQuestions,
          },
          veto: {
            questionCount: data.vetoQuestionCount,
            maxVoteAllowed: data.maxVetoVotesAllowed,
            timeLimit: data.vetoTimeLimit,
          },
        },
        (res: any) => {
          if (res.errors) {
            reject(res);
          } else {
            resolve(res);
          }
        }
      );
    }
  });
};

export const joinRoom = (socket: ISocket, roomId: string) => {
  return new Promise((resolve, reject) => {
    if (!socket) {
      reject(NO_CONNECTION);
    } else {
      socket.emit("JOIN_ROOM", roomId, (res: any) => {
        console.log("joinRoom: ", res);
        if (res.error) {
          reject(res);
        } else {
          resolve(res);
        }
      });
    }
  });
};

export const inviteToRoom = (
  socket: ISocket,
  input: {
    invitedUserId: number;
    invitedRoomId: string;
  }
) => {
  return new Promise((resolve, reject) => {
    if (!socket) {
      reject(NO_CONNECTION);
    } else {
      socket.emit("INVITE_TO_ROOM", input, (res: any) => {
        console.log("inviteToRoom: ", res);
        if (res.error) {
          reject(res);
        } else {
          resolve(res);
        }
      });
    }
  });
};

export const createTeam = (socket: ISocket, teamName: string) => {
  return new Promise((resolve, reject) => {
    if (!socket) {
      reject(NO_CONNECTION);
    } else {
      socket.emit("CREATE_TEAM", teamName, (res: any) => {
        console.log("createTeam: ", res);
        if (res.errors) {
          reject(res);
        } else {
          resolve(res);
        }
      });
    }
  });
};

export const joinTeam = (socket: ISocket, teamName: string) => {
  return new Promise((resolve, reject) => {
    if (!socket) {
      reject(NO_CONNECTION);
    } else {
      socket.emit("JOIN_TEAM", teamName, (res: any) => {
        console.log("joinTeam: ", res);
        if (res.error) {
          reject(res);
        } else {
          resolve(res);
        }
      });
    }
  });
};

export const leaveTeam = (socket: ISocket) => {
  return new Promise((resolve, reject) => {
    if (!socket) {
      reject(NO_CONNECTION);
    } else {
      socket.emit("LEAVE_TEAM", {}, (res: any) => {
        console.log("leaveTeam: ", res);
        if (res.error) {
          reject(res);
        } else {
          resolve(res);
        }
      });
    }
  });
};

export const leaveRoom = (socket: ISocket) => {
  return new Promise((resolve, reject) => {
    if (!socket) {
      reject(NO_CONNECTION);
    } else {
      socket.emit("LEAVE_ROOM", {}, (res: any) => {
        console.log("leaveRoom: ", res);
        if (res.error) {
          reject(res);
        } else {
          resolve(res);
        }
      });
    }
  });
};

export const sendChatMessage = (
  socket: ISocket,
  { message, toTeam }: { message: string; toTeam: boolean }
) => {
  return new Promise((resolve, reject) => {
    if (!socket) {
      reject(NO_CONNECTION);
    } else {
      socket.emit("SEND_CHAT_MSG", { message, toTeam }, (res: any) => {
        console.log("sendChatMessage: ", res);
        if (res.error) {
          reject(res);
        } else {
          resolve(res);
        }
      });
    }
  });
};

export const closeRoom = (
  socket: ISocket,
  { roomId, forceCloseRoom }: { roomId: string; forceCloseRoom: boolean }
) => {
  return new Promise((resolve, reject) => {
    if (!socket) {
      reject(NO_CONNECTION);
    } else {
      socket.emit("CLOSE_ROOM", { roomId, forceCloseRoom }, (res: any) => {
        console.log("closeRoom: ", res);
        if (res.error) {
          reject(res);
        } else {
          resolve(res);
        }
      });
    }
  });
};
