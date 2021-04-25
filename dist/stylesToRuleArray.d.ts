import { StylixContext } from './StylixProvider';
/**
 * Converts a Stylix CSS object to an array of rules, suitable for passing to StyleSheet#insertRule.
 */
export default function stylesToRuleArray(styles: any, hash: string, context: StylixContext): string[];
