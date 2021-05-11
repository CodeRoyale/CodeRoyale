import create from 'zustand';
import { devtools } from 'zustand/middleware';

let useCompQuestions = (set) => ({
  compQuestions: null,
  setCompQuestions: (compQuestions) => set(() => ({ compQuestions })),
});

if (process.env.REACT_APP_ENV === 'development') {
  useCompQuestions = devtools(useCompQuestions);
}

useCompQuestions = create(useCompQuestions);

export default useCompQuestions;
