import create from 'zustand';
import { devtools } from 'zustand/middleware';

let useVetoedUsers = (set) => ({
  vetoedUsers: [],
  setVetoedUsers: (vetoedUser) =>
    set((state) => ({ vetoedUsers: [...state.vetoedUsers, vetoedUser] })),
});

useVetoedUsers = devtools(useVetoedUsers);
useVetoedUsers = create(useVetoedUsers);

export default useVetoedUsers;
