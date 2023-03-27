import React, { createContext } from 'react';

export interface StyleCollector {
  collect: (element: React.ReactElement) => React.ReactElement;
  render: React.FC<React.ComponentProps<'style'>>;
  styles: string[];
}

export const styleCollectorContext = createContext<string[]>(null);

export function createStyleCollector() {
  const styles: string[] = [];
  const collector: StyleCollector = {
    collect: (element) => (
      <styleCollectorContext.Provider value={styles}>{element}</styleCollectorContext.Provider>
    ),
    render: (props: React.ComponentProps<'style'>) => (
      <style
        type="text/css"
        key={props.id || 'stylix'}
        {...props}
        dangerouslySetInnerHTML={{ __html: collector.styles.join(' ') }}
      />
    ),
    styles,
  };
  collector.render.displayName = 'StylixStyleCollectorRenderer';
  return collector;
}
