import create from "zustand";

type RoomInvite = {
  invitedRoomId: string;
  sender: number;
  receiver: number;
};

interface RoomState {
  // sender:invited:receiver
  // 31:invited:33
  invites: Record<string, RoomInvite>;
  addRoomInvite: (roomInvite: RoomInvite) => void;
  deleteInvite: (inviteKey: string) => void;
}

export const useRoomInvites = create<RoomState>()((set) => ({
  invites: {},
  addRoomInvite: (roomInvite) =>
    set((state) => {
      const inviteKey = `${roomInvite.sender}:invited:${roomInvite.receiver}`;

      return {
        invites: {
          ...state.invites,
          [inviteKey]: roomInvite,
        },
      };
    }),
  deleteInvite: (inviteKey) =>
    set((state) => {
      delete state.invites[inviteKey];
      return { invites: { ...state.invites } };
    }),
}));

/* {
  "31:invited:33": {
    invitedRoomId: "strinasdsadg";
    sender: 31;
    receiver: 33;
  }
} */
