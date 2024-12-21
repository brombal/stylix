export function StyleElement(
  props: { styles: string[] } & Partial<React.HTMLProps<HTMLStyleElement>>,
) {
  const { styles, ...other } = props;
  return (
    <style type="text/css" {...other} dangerouslySetInnerHTML={{ __html: styles.join('\n') }} />
  );
}
