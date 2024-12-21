import { type StylixMediaDefinition, processMediaStyles } from '../mediaObjects';

describe('mediaObjects', () => {
  const media = {
    mobile: (styles) => ({
      '@media (max-width: 600px)': styles,
    }),
    dark: (styles) => ({
      'html[theme="dark"] &': styles,
    }),
    light: (styles) => ({
      'html[theme="light"] &': styles,
    }),
    mobileDark: (styles) => ({
      '@media (max-width: 600px)': {
        'html[theme="dark"] &': styles,
      },
    }),
  } satisfies StylixMediaDefinition;

  const styleProps = {
    color: 'color',
    background: 'background',
    fontweight: 'font-weight',
    textdecoration: 'text-decoration',
    fontsize: 'font-size',
  };

  it('should convert simple media objects', () => {
    expect(
      processMediaStyles(media, styleProps, {
        color: 'color-default',
        fontWeight: 'fw-default',

        mobile: {
          color: 'color-mobile',
          fontWeight: 'fw-mobile',
        },
        dark: {
          color: 'color-dark',
          fontWeight: 'fw-dark',
        },
      }),
    ).toEqual([
      {
        color: 'color-default',
        fontWeight: 'fw-default',
      },
      {
        '@media (max-width: 600px)': {
          color: 'color-mobile',
          fontWeight: 'fw-mobile',
        },
      },
      {
        'html[theme="dark"] &': {
          color: 'color-dark',
          fontWeight: 'fw-dark',
        },
      },
    ]);
  });

  it('should convert nested media objects', () => {
    expect(
      processMediaStyles(media, styleProps, {
        main: {
          div: {
            color: 'div-default-color',
            fontWeight: 'div-default-fw',

            mobile: {
              color: 'div-mobile-color',
              fontWeight: 'div-mobile-fw',

              dark: {
                color: 'div-mobile-dark-color',
                fontWeight: 'div-mobile-dark-fw',
              },
            },
          },
          span: {
            color: 'span-defualt-color',
            fontWeight: 'span-default-fw',

            mobile: {
              color: 'span-mobile-color',
              fontWeight: 'span-mobile-fw',
            },

            a: {
              color: 'span-a-default-color',
              fontWeight: 'span-a-default-fw',

              mobile: {
                color: 'span-a-mobile-color',
                fontWeight: 'span-a-mobile-fw',

                dark: {
                  color: 'span-a-mobile-dark-color',
                  fontWeight: 'span-a-mobile-dark-fw',
                },
              },
            },
          },
        },
      }),
    ).toEqual({
      main: {
        div: [
          {
            color: 'div-default-color',
            fontWeight: 'div-default-fw',
          },
          {
            '@media (max-width: 600px)': [
              {
                color: 'div-mobile-color',
                fontWeight: 'div-mobile-fw',
              },
              {
                'html[theme="dark"] &': {
                  color: 'div-mobile-dark-color',
                  fontWeight: 'div-mobile-dark-fw',
                },
              },
            ],
          },
        ],
        span: [
          {
            color: 'span-defualt-color',
            fontWeight: 'span-default-fw',
          },
          {
            '@media (max-width: 600px)': {
              color: 'span-mobile-color',
              fontWeight: 'span-mobile-fw',
            },
          },
          {
            a: [
              {
                color: 'span-a-default-color',
                fontWeight: 'span-a-default-fw',
              },
              {
                '@media (max-width: 600px)': [
                  {
                    color: 'span-a-mobile-color',
                    fontWeight: 'span-a-mobile-fw',
                  },
                  {
                    'html[theme="dark"] &': {
                      color: 'span-a-mobile-dark-color',
                      fontWeight: 'span-a-mobile-dark-fw',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    });
  });

  it('should convert media objects for style props', () => {
    expect(
      processMediaStyles(media, styleProps, {
        span: {
          fontWeight: {
            default: 'fw-default',
            mobile: 'fw-mobile',
            dark: 'fw-dark',
            light: 'fw-light',
          },
          color: {
            default: 'color-default',
            mobile: 'color-mobile',
            dark: 'color-dark',
            light: 'color-light',
          },
        },
      }),
    ).toEqual({
      span: [
        {
          fontWeight: 'fw-default',
        },
        {
          '@media (max-width: 600px)': {
            fontWeight: 'fw-mobile',
          },
        },
        {
          'html[theme="dark"] &': {
            fontWeight: 'fw-dark',
          },
        },
        {
          'html[theme="light"] &': {
            fontWeight: 'fw-light',
          },
        },
        {
          color: 'color-default',
        },
        {
          '@media (max-width: 600px)': {
            color: 'color-mobile',
          },
        },
        {
          'html[theme="dark"] &': {
            color: 'color-dark',
          },
        },
        {
          'html[theme="light"] &': {
            color: 'color-light',
          },
        },
      ],
    });
  });

  it('should convert arrays in media objects', () => {
    expect(
      processMediaStyles(media, styleProps, {
        span: {
          color: 'span-color',

          mobile: [
            {
              color: 'color-mobile-1',
              fontWeight: 'fw-mobile-1',
            },
            {
              color: 'color-mobile-2',
            },
          ],
        },
      }),
    ).toEqual({
      span: [
        {
          color: 'span-color',
        },
        {
          '@media (max-width: 600px)': [
            {
              color: 'color-mobile-1',
              fontWeight: 'fw-mobile-1',
            },
            {
              color: 'color-mobile-2',
            },
          ],
        },
      ],
    });
  });
});
