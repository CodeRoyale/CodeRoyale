import create from 'zustand';
import { devtools } from 'zustand/middleware';

/* eslint-disable import/no-mutable-exports */
let useVetoedUsers = (set) => ({
  vetoedUsers: [],
  setVetoedUsers: (vetoedUser) =>
    set((state) => ({ vetoedUsers: [...state.vetoedUsers, vetoedUser] })),
});

if (process.env.REACT_APP_ENV === 'development') {
  useVetoedUsers = devtools(useVetoedUsers);
}

useVetoedUsers = create(useVetoedUsers);

export default useVetoedUsers;
