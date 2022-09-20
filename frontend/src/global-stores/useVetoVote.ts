import create from "zustand";
import { persist } from "zustand/middleware";

interface VetoVoteState {
  votes: number[];
  addVote: (questionId: number) => void;
  deleteVote: (questionId: number) => void;
}

export const useVetoVote = create<VetoVoteState>()(
  persist(
    (set, get) => ({
      votes: [],
      addVote: (questionId) =>
        set(() => {
          const { votes } = get();
          votes.push(questionId);

          return { votes };
        }),
      deleteVote: (questionId) =>
        set(() => {
          let { votes } = get();
          votes = votes.filter((vote) => vote !== questionId);

          return { votes };
        }),
    }),
    {
      name: "veto-vote-storage", // name of item in the storage (must be unique)
      partialize: (state) => ({ votes: state.votes }),
    }
  )
);
