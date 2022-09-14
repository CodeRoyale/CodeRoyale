import create from "zustand";

type VetoUser = {
  userId: number;
  teamName: string;
};

interface VetoUserState {
  vetoUsers: VetoUser[];
  votedUsers: VetoUser[];
  addVetoUser: (userId: number, teamName: string) => void;
  addVotedUser: (userId: number, teamName: string) => void;
  emptyVetoUserState: () => void;
}

export const useVetoUsers = create<VetoUserState>()((set) => ({
  vetoUsers: [],
  votedUsers: [],
  addVetoUser: (userId, teamName) =>
    set((state) => ({ vetoUsers: [...state.vetoUsers, { userId, teamName }] })),
  addVotedUser: (userId, teamName) =>
    set((state) => ({
      votedUsers: [...state.votedUsers, { userId, teamName }],
    })),
  emptyVetoUserState: () => set(() => ({ vetoUsers: [], votedUsers: [] })),
}));
