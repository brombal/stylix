import { useLayoutEffect } from 'react';

const useIsoLayoutEffect =
  typeof window !== 'undefined'
    ? (fn: () => void | (() => void), deps: any[], runOnSsr: boolean) => useLayoutEffect(fn, deps)
    : (fn: () => () => void, deps: any[], runOnSsr: boolean) => (runOnSsr ? fn() : null);

export default useIsoLayoutEffect;
