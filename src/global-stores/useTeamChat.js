import create from 'zustand';
import { devtools } from 'zustand/middleware';

let useTeamChat = (set) => ({
  teamChat: [],
  setTeamChat: (chat) =>
    set((state) => ({ teamChat: [...state.teamChat, chat] })),
});

if (process.env.REACT_APP_ENV === 'development') {
  useTeamChat = devtools(useTeamChat);
}

useTeamChat = create(useTeamChat);

export default useTeamChat;
