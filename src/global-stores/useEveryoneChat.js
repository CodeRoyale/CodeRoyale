import create from 'zustand';
import { devtools } from 'zustand/middleware';

let useEveryoneChat = (set) => ({
  everyoneChat: [],
  setEveryoneChat: (chat) =>
    set((state) => ({ everyoneChat: [...state.everyoneChat, chat] })),
});

if (process.env.REACT_APP_ENV === 'development') {
  useEveryoneChat = devtools(useEveryoneChat);
}

useEveryoneChat = create(useEveryoneChat);

export default useEveryoneChat;
