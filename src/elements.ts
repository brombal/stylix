import { styled } from './styled.tsx';
import Stylix from './Stylix.tsx';
import htmlTags from './html-tags.json' assert { type: "json" };

for (const i in htmlTags) {
  const tag = htmlTags[i] as keyof JSX.IntrinsicElements;
  Stylix[tag] = styled(tag);
}
