import create from "zustand";

interface VetoVoteState {
  votes: number[];
  addVote: (questionId: number) => void;
  deleteVote: (questionId: number) => void;
}

export const useVetoVote = create<VetoVoteState>()((set) => ({
  votes: [],
  addVote: (questionId) =>
    set((state) => ({ votes: [...state.votes, questionId] })),
  deleteVote: (questionId) =>
    set((state) => {
      let { votes } = state;
      votes = votes.filter((vote) => vote !== questionId);

      return { votes };
    }),
}));
