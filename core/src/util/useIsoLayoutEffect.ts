import { useLayoutEffect } from 'react';

export const detectSSR = () => !(typeof window !== 'undefined' && window.document?.head?.appendChild);

export default function useIsoLayoutEffect(
  fn: () => void | (() => void),
  deps?: unknown[],
  runOnSsr?: boolean,
  isSsr = detectSSR(),
) {
  if (isSsr) {
    if (runOnSsr) return fn();
  } else {
    useLayoutEffect(fn, deps);
  }
}
