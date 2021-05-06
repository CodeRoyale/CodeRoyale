import create from 'zustand';
import { devtools } from 'zustand/middleware';

let useTeamEvent = (set) => ({
  teamEvent: null,
  setTeamEvent: (event) => set(() => ({ teamEvent: event })),
});

useTeamEvent = devtools(useTeamEvent);
useTeamEvent = create(useTeamEvent);

export default useTeamEvent;
