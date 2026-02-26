import $ from '../index';
import { createStylixContext } from '../stylixContext';
import { renderStylix } from './util';

describe('static styles', () => {
  it('should render', () => {
    const stylixCtx = createStylixContext({});

    const styles = stylixCtx.styles({
      color: 'red',

      '.child': {
        color: 'blue',
      },
    });

    const el = <$.div className={styles} />;

    const [json, renderedStyles] = renderStylix(el, { context: stylixCtx });

    expect(json).toEqual('<div class="stylix-1"></div>');
    expect(renderedStyles).toMatchSnapshot();
  });

  it('should render combined static styles with dynamic styles', () => {
    const stylixCtx = createStylixContext({});

    const styles = stylixCtx.styles({
      color: 'red',

      '.child': {
        color: 'blue',
      },
    });

    const el = <$.div className={styles} font-size={16} />;

    const [json, renderedStyles] = renderStylix(el, { context: stylixCtx });

    expect(json).toEqual('<div class="stylix-2 stylix-1"></div>');
    expect(renderedStyles).toMatchSnapshot();
  });

  it('should render global static styles', () => {
    const stylixCtx = createStylixContext({});

    stylixCtx.styles(
      {
        div: {
          color: 'red',

          '.child': {
            color: 'blue',
          },
        },
      },
      { global: true },
    );

    const el = <$.div />;

    const [json, renderedStyles] = renderStylix(el, { context: stylixCtx });

    expect(json).toEqual('<div></div>');
    expect(renderedStyles).toMatchSnapshot();
  });
});
