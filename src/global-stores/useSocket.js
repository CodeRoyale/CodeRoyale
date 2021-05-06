import create from 'zustand';
import { devtools } from 'zustand/middleware';

let useSocket = (set) => ({
  socket: null,
  setSocket: (socket) => set(() => ({ socket })),
});

useSocket = devtools(useSocket);
useSocket = create(useSocket);

export default useSocket;
