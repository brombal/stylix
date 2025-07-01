import { useLayoutEffect } from 'react';

export const detectSSR = () =>
  !(typeof window !== 'undefined' && window.document?.head?.appendChild);

export default function useIsoLayoutEffect(
  fn: () => void | (() => void),
  deps?: unknown[],
  runOnSsr?: boolean,
  isSsr = detectSSR(),
) {
  if (isSsr) {
    if (runOnSsr) return fn();
  } else {
    // biome-ignore lint/correctness/useHookAtTopLevel: isSsr should never change
    // biome-ignore lint/correctness/useExhaustiveDependencies: dependencies are passed as-is
    useLayoutEffect(fn, deps);
  }
}
