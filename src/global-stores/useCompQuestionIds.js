import create from 'zustand';
import { devtools } from 'zustand/middleware';

/* eslint-disable import/no-mutable-exports */
let useCompQuestionIds = (set) => ({
  compQuestionIds: null,
  setCompQuestionIds: (compQuestionIds) => set(() => ({ compQuestionIds })),
});

if (process.env.REACT_APP_ENV === 'development') {
  useCompQuestionIds = devtools(useCompQuestionIds);
}

useCompQuestionIds = create(useCompQuestionIds);

export default useCompQuestionIds;
