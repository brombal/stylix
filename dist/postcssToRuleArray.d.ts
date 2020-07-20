import { StylixContext } from './StylixProvider';
/**
 * Converts styles to an array of rules (suitable for passing to StyleSheet#insertRule()
 */
export default function postcssToRuleArray(styles: string, ctx: StylixContext): string[];
