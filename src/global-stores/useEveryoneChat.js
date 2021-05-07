import create from 'zustand';
import { devtools } from 'zustand/middleware';

let useEveryoneChat = (set) => ({
  everyoneChat: [],
  setEveryoneChat: (chat) =>
    set((state) => ({ everyoneChat: [...state.everyoneChat, chat] })),
});

useEveryoneChat = devtools(useEveryoneChat);
useEveryoneChat = create(useEveryoneChat);

export default useEveryoneChat;
