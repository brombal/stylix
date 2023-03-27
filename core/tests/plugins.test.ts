import { _merge$css } from '../src/plugins/merge$css';

describe('merge$css', () => {
  it('should work', () => {
    const a = {
      fontWeight: 'bold',
      $css: {
        fontWeight: 'normal',
        fontSize: 16,
        $css: {
          '&:hover': {
            color: 'blue',
            fontSize: 30,
            $css: null,
          },
          $css: [
            {
              color: 'purple',
              border: 1,
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            {
              '&:hover': {
                fontFamily: 'serif',
              },
            },
          ],
        },
        '&:hover': {
          color: 'red',
          $css: [
            {
              fontWeight: 'bold',
              $css: null,
            },
            null,
            {
              fontFamily: 'sans-serif',
            },
          ],
        },
      },
      color: ['green', 'red', 'blue'],
    };

    const b = {
      fontWeight: 'normal',
      fontSize: 16,
      '&:hover': {
        color: 'red',
        fontSize: 30,
        textDecoration: 'underline',
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
      },
      border: 1,
      color: ['green', 'red', 'blue'],
    };

    const result = {};
    _merge$css(a, result);
    expect(result).toEqual(b);
  });
});
