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
        "createRoom",
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
        (res) => {
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
      socket.emit("joinRoom", roomId, (res) => {
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
      socket.emit("inviteToRoom", input, (res) => {
        console.log("inviteToRoom: ", res);
        if (res) {
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
      socket.emit("createTeam", teamName, (res) => {
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
      socket.emit("joinTeam", teamName, (res) => {
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
      socket.emit("leaveTeam", (res) => {
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

export const deleteTeam = (socket: ISocket, teamName: string) => {
  return new Promise((resolve, reject) => {
    if (!socket) {
      reject(NO_CONNECTION);
    } else {
      socket.emit("deleteTeam", teamName, (res) => {
        console.log("deleteTeam: ", res);
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
      socket.emit("leaveRoom", (res) => {
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
      socket.emit("sendChatMessage", { message, toTeam }, (res) => {
        console.log("sendChatMessage: ", res);
        if (res.errors) {
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
      socket.emit("closeRoom", { roomId, forceCloseRoom }, (res) => {
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
