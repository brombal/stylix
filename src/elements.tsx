import Stylix from './Stylix';
import htmlTags from './html-tags';

for (const i in htmlTags) {
  const Tag = htmlTags[i];
  (Stylix as any)[Tag] = ({ htmlContent, htmlTranslate, ...props }: any) => (
    <Stylix
      $render={(className, props) => (
        <Tag className={className} content={htmlContent} translate={htmlTranslate} {...props} />
      )}
      {...props}
    />
  );
  (Stylix as any)[Tag].__isStylix = true;
  (Stylix as any)[Tag].displayName = `stylix-${Tag}`;
}
