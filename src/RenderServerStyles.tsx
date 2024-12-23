import { StyleElement } from './StyleElement';
import { useStylixContext } from './StylixProvider';
import { flattenRules } from './applyRules';
import type { HTMLProps } from './elements';

export function RenderServerStyles(props: Partial<HTMLProps<'style'>>) {
  const ctx = useStylixContext();
  return <StyleElement styles={ctx.ssr ? flattenRules(ctx) : []} {...props} />;
}
