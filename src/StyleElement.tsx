import type { HTMLProps } from './elements';

export function StyleElement(props: { styles: string[] } & Partial<HTMLProps<'style'>>) {
  const { styles, ...other } = props;
  return (
    <style type="text/css" {...other} dangerouslySetInnerHTML={{ __html: styles.join('\n') }} />
  );
}
