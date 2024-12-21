import React from 'react';

export function getParentComponentName() {
  return (
    React as any
  ).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED?.ReactDebugCurrentFrame?.getStackAddendum?.()
    ?.split('\n')
    ?.map((line: any) => {
      // Look for a component name like "Component$123", either at the start of the line (Firefox) or after "at " (Safari/Chrome)
      const m = line.match(/^([A-Z][A-Za-z0-9$]*)|^\s*at ([A-Z][A-Za-z0-9$]*)/);
      return m?.[1] || m?.[2];
    })
    .filter(Boolean)
    .reverse()
    .slice(-1)[0];
}
