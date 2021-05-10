import create from 'zustand';
import { devtools } from 'zustand/middleware';

let useCodeSubmitLoading = (set) => ({
  codeSubmitLoading: false,
  setCodeSubmitLoading: (codeSubmitLoading) =>
    set(() => ({ codeSubmitLoading })),
});

useCodeSubmitLoading = devtools(useCodeSubmitLoading);
useCodeSubmitLoading = create(useCodeSubmitLoading);

export default useCodeSubmitLoading;
