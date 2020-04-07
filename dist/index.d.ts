import React from 'react';
import { StylixProps } from './types';
declare const Stylix: (<ElType extends React.ElementType = 'div'>(props: StylixProps<ElType>) => any) & {
    displayName?: string;
    __isStylix?: true;
};
export default Stylix;
