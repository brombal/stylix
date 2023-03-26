import * as React from 'react';
export interface StyleCollector {
    collect: (element: React.ReactElement) => React.ReactElement;
    render: React.FC<React.ComponentProps<'style'>>;
    styles: string[];
}
export declare const styleCollectorContext: React.Context<string[]>;
export declare function createStyleCollector(): StyleCollector;
