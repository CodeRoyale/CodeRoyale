import create from 'zustand';
import { devtools } from 'zustand/middleware';

let useRoom = (set) => ({
  room: null,
  setRoom: (room) => set(() => ({ room })),
});

useRoom = devtools(useRoom);
useRoom = create(useRoom);

export default useRoom;
