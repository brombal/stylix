import React from 'react';

import { flattenRules } from './applyRules';
import { useStylixContext } from './StylixProvider';

export function StyleElement(
  props: { styles: string[] } & Partial<React.HTMLProps<HTMLStyleElement>>,
) {
  const { styles, ...other } = props;
  return (
    <style type="text/css" {...other} dangerouslySetInnerHTML={{ __html: styles.join('\n') }} />
  );
}

export function RenderServerStyles(props: Partial<React.HTMLProps<HTMLStyleElement>>) {
  const ctx = useStylixContext();
  return <StyleElement styles={ctx.ssr ? flattenRules(ctx!) : []} {...props} />;
}
