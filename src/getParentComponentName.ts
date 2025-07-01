import React from 'react';

export function getParentComponentName(): string | undefined {
  const internals = (React as any).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  const stack = internals?.ReactDebugCurrentFrame?.getStackAddendum?.()?.split('\n') || [];
  for (const line of stack) {
    // Look for a component name like "Component$123", either at the start of the line (Firefox) or after "at " (Safari/Chrome)
    const m = line.trim().match(/^(?:at )?([A-Z][A-Za-z0-9$.]*)/);
    const res = m?.[1] && m[1] !== 'Stylix' ? m[1] : undefined;
    if (res) return res;
  }
}
