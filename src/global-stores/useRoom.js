import create from 'zustand';
import { devtools } from 'zustand/middleware';

let useRoom = (set) => ({
  room: null,
  setRoom: (room) => set(() => ({ room })),
  updateRoomTeams: (teamsData) =>
    set((state) => ({ room: { ...state.room, teams: teamsData } })),
});

if (process.env.REACT_APP_ENV === 'development') {
  useRoom = devtools(useRoom);
}

useRoom = create(useRoom);

export default useRoom;
