import create from 'zustand';
import { devtools } from 'zustand/middleware';

let useUserVetoed = (set) => ({
  userVetoed: false,
  setUserVetoed: () => set(() => ({ userVetoed: true })),
});

if (process.env.REACT_APP_ENV === 'development') {
  useUserVetoed = devtools(useUserVetoed);
}

useUserVetoed = create(useUserVetoed);

export default useUserVetoed;
