import { ISocket } from '../modules/ws/WebSocketProvider';

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
      reject('No connection');
    } else {
      socket.emit(
        'CREATE_ROOM',
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
          if (res.error) {
            reject(res);
          } else {
            resolve(res);
          }
        }
      );
    }
  });
};
