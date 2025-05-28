import type React from 'react';
import { createContext } from 'react';

import { StyleElement } from './StyleElement';

export interface StyleCollector {
  collect: (element: React.ReactElement) => React.ReactElement;
  render: React.FC<React.ComponentProps<'style'>>;
  styles: string[];
}

export const styleCollectorContext = createContext<string[] | undefined>(undefined);

export function createStyleCollector() {
  const styles: string[] = [];
  const collector: StyleCollector = {
    collect: (element) => (
      <styleCollectorContext.Provider value={styles}>{element}</styleCollectorContext.Provider>
    ),
    render: (props: React.ComponentProps<'style'>) => (
      <StyleElement key={props.id || 'stylix'} styles={collector.styles} />
    ),
    styles,
  };
  collector.render.displayName = 'StylixStyleCollectorRenderer';
  return collector;
}
