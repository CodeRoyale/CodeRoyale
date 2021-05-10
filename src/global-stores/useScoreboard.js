import create from 'zustand';
import { devtools } from 'zustand/middleware';

let useScoreboard = (set) => ({
  scoreboard: null,
  setScoreboard: (scoreboard) => set(() => ({ scoreboard })),
  updateScore: (teamName, problemCode) =>
    set((state) => ({
      scoreboard: {
        ...state.scoreboard,
        [teamName]: [...state.scoreboard[teamName], problemCode],
      },
    })),
});

useScoreboard = devtools(useScoreboard);
useScoreboard = create(useScoreboard);

export default useScoreboard;
