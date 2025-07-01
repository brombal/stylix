import { act } from '@testing-library/react';
import { useState } from 'react';
import $, { useGlobalStyles } from '../index';
import { renderStylix } from './util';

describe('global styles', () => {
  it('should work', async () => {
    function Component() {
      useGlobalStyles({
        main: {
          color: 'red',
        },
      });

      return <main data-testid="main">test</main>;
    }

    const { containerHtml: json, styleElement } = renderStylix(<Component />);

    expect(json).toMatchSnapshot();
    expect(styleElement.innerHTML).toMatchSnapshot();
  });

  it('should remove styles if unused', async () => {
    function Component() {
      const [color, setColor] = useState('red');

      useGlobalStyles({
        main: {
          color,
        },
      });

      return (
        <div>
          <main data-testid="main">test</main>
          <button
            data-testid="button"
            type="button"
            onClick={() => setColor((c) => (c === 'red' ? 'blue' : 'red'))}
          >
            toggle color
          </button>
        </div>
      );
    }

    const { containerHtml, result, styleElement } = renderStylix(<Component />);

    expect(containerHtml).toMatchSnapshot();
    expect(styleElement.innerHTML).toMatchSnapshot();
    act(() => result.getByTestId('button').click());
    expect(styleElement.innerHTML).toMatchSnapshot();
  });

  it('should handle matching global and component styles', async () => {
    function Component() {
      useGlobalStyles([
        {
          main: {
            color: 'red',
          },
        },
      ]);

      return (
        <div>
          <main data-testid="main">test</main>
          <$.div data-testid="div" $css={{ main: { color: 'blue' } }}>
            <main data-testid="inner-main">test</main>
          </$.div>
        </div>
      );
    }

    const { containerHtml, styleElement } = renderStylix(<Component />);

    expect(containerHtml).toMatchSnapshot();
    expect(styleElement.innerHTML).toMatchSnapshot();
  });
});
