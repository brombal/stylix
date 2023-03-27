import { useLayoutEffect } from 'react';

const useIsoLayoutEffect =
  typeof window !== 'undefined' && 'document' in window
    ? (fn: () => void | (() => void), deps?: unknown[], _runOnSsr?: boolean) => useLayoutEffect(fn, deps)
    : (fn: () => void | (() => void), _deps?: unknown[], runOnSsr?: boolean) => (runOnSsr ? fn() : null);

export default useIsoLayoutEffect;
