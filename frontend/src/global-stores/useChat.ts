import create from "zustand";
import { ChatMessageType } from "../components/chat/ChatMessage";

type Chat = {
  fromUserId: number;
  type: ChatMessageType;
  message: string;
};

interface ChatState {
  chat: Chat[];
  userChatIdentityColors: Record<number, string>;
  addUserChatIdentityColor: (userId: number, identityColor: string) => void;
  emptyUserChatIdentityColors: () => void;
  addChat: (chat: Chat) => void;
  emptyChat: () => void;
}

export const useChat = create<ChatState>()((set) => ({
  chat: [],
  userChatIdentityColors: {},
  addUserChatIdentityColor: (userId, identityColor) =>
    set((state) => ({
      userChatIdentityColors: {
        ...state.userChatIdentityColors,
        [userId]: identityColor,
      },
    })),
  addChat: (chat) =>
    set((state) => ({
      chat: [...state.chat, chat],
    })),
  emptyChat: () =>
    set(() => ({
      chat: [],
    })),
  emptyUserChatIdentityColors: () =>
    set(() => ({
      userChatIdentityColors: {},
    })),
}));
