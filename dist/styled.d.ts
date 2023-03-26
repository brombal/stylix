import * as React from 'react';
import { Extends, StylixComponentMeta, StylixStyleProps } from './types';
export type StylixStyledComponent<TProps> = React.FC<Extends<StylixStyleProps, TProps>> & StylixComponentMeta;
export type HtmlOrComponent = keyof JSX.IntrinsicElements | React.ForwardRefRenderFunction<any, any>;
export type HtmlOrComponentProps<TComponent extends HtmlOrComponent> = TComponent extends keyof JSX.IntrinsicElements ? React.ComponentPropsWithRef<TComponent> : TComponent extends React.ForwardRefRenderFunction<infer R, infer P> ? P & React.RefAttributes<R> : never;
export declare function styled<TComponent extends HtmlOrComponent, TPropMap extends Record<string, string> = Record<string, never>>($el: TComponent, addProps?: TComponent extends keyof JSX.IntrinsicElements ? Extends<StylixStyleProps, React.ComponentPropsWithoutRef<TComponent>> : TComponent extends React.ElementType<infer P> ? Extends<StylixStyleProps, Partial<P>> : never, conflictingPropMapping?: TPropMap): StylixStyledComponent<HtmlOrComponentProps<TComponent>>;
