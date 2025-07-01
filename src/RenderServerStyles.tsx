import { flattenRules } from './applyRules';
import type { HTMLProps } from './elements';
import { StyleElement } from './StyleElement';
import { useStylixContext } from './StylixProvider';

export function RenderServerStyles(props: Partial<HTMLProps<'style'>>) {
  const ctx = useStylixContext();
  return <StyleElement styles={ctx.ssr ? flattenRules(ctx) : []} {...props} />;
}
