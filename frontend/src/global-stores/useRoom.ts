import create from "zustand";
import { Room } from "@coderoyale/common";

interface RoomState {
  room: Room | null;
  setRoom: (room: Room | null) => void;
}

export const useRoom = create<RoomState>()((set) => ({
  room: null,
  setRoom: (room) => set(() => ({ room })),
}));
