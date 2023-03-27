import htmlTags from './html-tags.json';
import { styled } from './styled';
import Stylix from './Stylix';

for (const i in htmlTags) {
  // Types are specified in ./types.ts, so we don't care what they type of htmlTags[i] is.
  // JSX.IntrinsicElements is a union of all HTML tags, so it is too complex for TypeScript to infer.
  const tag = htmlTags[i] as any;
  Stylix[tag] = styled(tag);
}
