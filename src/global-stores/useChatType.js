import create from 'zustand';
import { devtools } from 'zustand/middleware';

let useChatType = (set) => ({
  chatType: 'everyone',
  setChatType: (type) => set(() => ({ chatType: type })),
});

if (process.env.REACT_APP_ENV === 'development') {
  useChatType = devtools(useChatType);
}

useChatType = create(useChatType);

export default useChatType;
