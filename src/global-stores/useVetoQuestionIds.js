import create from 'zustand';
import { devtools } from 'zustand/middleware';

let useVetoQuestionIds = (set) => ({
  vetoQuestionIds: null,
  setVetoQuestionIds: (vetoQuestionIds) => set(() => ({ vetoQuestionIds })),
});

if (process.env.REACT_APP_ENV === 'development') {
  useVetoQuestionIds = devtools(useVetoQuestionIds);
}

useVetoQuestionIds = create(useVetoQuestionIds);

export default useVetoQuestionIds;
