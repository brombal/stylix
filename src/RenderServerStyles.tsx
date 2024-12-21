import type React from 'react';
import { StyleElement } from './StyleElement';
import { useStylixContext } from './StylixProvider';
import { flattenRules } from './applyRules';

export function RenderServerStyles(props: Partial<React.HTMLProps<HTMLStyleElement>>) {
  const ctx = useStylixContext();
  return <StyleElement styles={ctx.ssr ? flattenRules(ctx) : []} {...props} />;
}
