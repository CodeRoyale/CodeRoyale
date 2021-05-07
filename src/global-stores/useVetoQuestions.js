import create from 'zustand';
import { devtools } from 'zustand/middleware';

let useVetoQuestions = (set) => ({
  vetoQuestions: null,
  setVetoQuestions: (vetoQuestions) => set(() => ({ vetoQuestions })),
});

useVetoQuestions = devtools(useVetoQuestions);
useVetoQuestions = create(useVetoQuestions);

export default useVetoQuestions;
