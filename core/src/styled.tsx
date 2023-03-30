import React from 'react';

import { _Stylix } from './Stylix';
import { Extends, StylixComponentMeta, StylixStyleProps } from './types';

export type StylixStyledComponentWithProps<TProps> = React.FC<Extends<TProps, StylixStyleProps>> &
  StylixComponentMeta;

export type StylixStyledComponent<TComponent extends HtmlOrComponent> =
  StylixStyledComponentWithProps<HtmlOrComponentProps<TComponent>>;

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
  addProps?: Extends<StylixStyleProps, Partial<HtmlOrComponentProps<TComponent>>>,
  conflictingPropMapping?: TPropMap,
): StylixStyledComponent<TComponent> {
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
        ...(addProps?.$css || props?.$css
          ? { $css: [addProps?.$css, props?.$css].filter(Boolean) }
          : {}),
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
