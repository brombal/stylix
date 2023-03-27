import React from 'react';

import { _Stylix } from './Stylix';
import { Extends, StylixComponentMeta, StylixStyleProps } from './types';

export type StylixStyledComponent<TProps> = React.FC<Extends<StylixStyleProps, TProps>> &
  StylixComponentMeta;

export type HtmlOrComponent =
  | keyof JSX.IntrinsicElements
  | React.ForwardRefRenderFunction<any, any>;

export type HtmlOrComponentProps<TComponent extends HtmlOrComponent> =
  TComponent extends keyof JSX.IntrinsicElements
    ? React.ComponentPropsWithRef<TComponent>
    : TComponent extends React.ForwardRefRenderFunction<infer R, infer P>
    ? P & React.RefAttributes<R>
    : never;

export function styled<
  TComponent extends HtmlOrComponent,
  TPropMap extends Record<string, string> = Record<string, never>,
>(
  $el: TComponent,
  addProps?: Partial<HtmlOrComponentProps<TComponent>>,
  conflictingPropMapping?: TPropMap,
): StylixStyledComponent<HtmlOrComponentProps<TComponent>> {
  const Element: any = typeof $el === 'string' ? ($el as any) : React.forwardRef($el);
  const r: any = React.forwardRef((props: Record<string, any>, ref: React.Ref<unknown>) => {
    if (conflictingPropMapping) {
      for (const k in conflictingPropMapping) {
        props[conflictingPropMapping[k]] = (props as any)[k];
        delete props[k];
      }
    }
    return _Stylix(
      {
        $el: Element,
        ...addProps,
        ...props,
        $css: [addProps?.$css, props?.$css],
      },
      ref as any,
    );
  });
  r.displayName = `$.${
    ($el as React.FC).displayName ||
    ($el as React.FC).name ||
    ($el as string).toString?.() ||
    'Unnamed'
  }`;
  r.__isStylix = true;
  return r;
}