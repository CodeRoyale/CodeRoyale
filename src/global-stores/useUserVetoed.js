import create from 'zustand';
import { devtools } from 'zustand/middleware';

let useUserVetoed = (set) => ({
  userVetoed: false,
  setUserVetoed: () => set(() => ({ userVetoed: true })),
});

useUserVetoed = devtools(useUserVetoed);
useUserVetoed = create(useUserVetoed);

export default useUserVetoed;
