import create from 'zustand';
import { devtools } from 'zustand/middleware';

let useCompQuestions = (set) => ({
  compQuestions: null,
  setCompQuestions: (compQuestions) => set(() => ({ compQuestions })),
});

useCompQuestions = devtools(useCompQuestions);
useCompQuestions = create(useCompQuestions);

export default useCompQuestions;
