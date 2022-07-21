export type Room = {
  config: {
    id: string;
    title: string;
    creatorUsername: string;
    private: boolean;
    adminUserId: number;
    maxMembers: number;
    maxTeams: number;
    maxMembersPerTeam: number;
  };
  state: {
    currMemberCount: number;
    bannedMemberIds: number[];
    bench: number[]; // without a team
  };
  competition: {
    questionIds: number[];
    maxQuestions: number;
    isOngoing: boolean;
    timeLimit: number;
    contestStartedAt: Date | null;
    contestEndedAt: Date | null;
    veto: {
      questionCount: number;
      questionIds: number[];
      maxVoteAllowed: number;
      isOngoing: boolean;
      timeLimit: number;
      votedUserIds: number[];
    };
  };
  teams: Record<string, number[]> | null;
};