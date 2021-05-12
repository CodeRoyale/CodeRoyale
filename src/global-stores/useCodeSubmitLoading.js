import create from 'zustand';
import { devtools } from 'zustand/middleware';

/* eslint-disable import/no-mutable-exports */
let useCodeSubmitLoading = (set) => ({
  codeSubmitLoading: false,
  setCodeSubmitLoading: (codeSubmitLoading) =>
    set(() => ({ codeSubmitLoading })),
});

if (process.env.REACT_APP_ENV === 'development') {
  useCodeSubmitLoading = devtools(useCodeSubmitLoading);
}

useCodeSubmitLoading = create(useCodeSubmitLoading);

export default useCodeSubmitLoading;
