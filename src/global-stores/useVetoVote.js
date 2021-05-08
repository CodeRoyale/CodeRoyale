import create from 'zustand';
import { devtools } from 'zustand/middleware';

let useVetoVote = (set) => ({
  vetoVotedQuestions: [],
  addVetoVote: (quesId) =>
    set((state) => ({
      vetoVotedQuestions: [...state.vetoVotedQuestions, quesId],
    })),
  removeVetoVote: (quesIdToRemove) =>
    set((state) => {
      let vetoVotedQuestions = state.vetoVotedQuestions;
      vetoVotedQuestions = vetoVotedQuestions.filter(
        (quesId) => quesId !== quesIdToRemove
      );
      return { vetoVotedQuestions };
    }),
});

useVetoVote = devtools(useVetoVote);
useVetoVote = create(useVetoVote);

export default useVetoVote;
