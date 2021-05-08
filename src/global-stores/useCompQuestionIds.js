import create from 'zustand';
import { devtools } from 'zustand/middleware';

let useCompQuestionIds = (set) => ({
  compQuestionIds: null,
  setCompQuestionIds: (compQuestionIds) => set(() => ({ compQuestionIds })),
});

useCompQuestionIds = devtools(useCompQuestionIds);
useCompQuestionIds = create(useCompQuestionIds);

export default useCompQuestionIds;
