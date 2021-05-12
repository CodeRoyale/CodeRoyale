import create from 'zustand';
import { devtools } from 'zustand/middleware';

/* eslint-disable import/no-mutable-exports */
let useVetoQuestionIds = (set) => ({
  vetoQuestionIds: null,
  setVetoQuestionIds: (vetoQuestionIds) => set(() => ({ vetoQuestionIds })),
});

if (process.env.REACT_APP_ENV === 'development') {
  useVetoQuestionIds = devtools(useVetoQuestionIds);
}

useVetoQuestionIds = create(useVetoQuestionIds);

export default useVetoQuestionIds;
