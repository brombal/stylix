import {_hoistLayers} from '../hoistLayers';

describe('hoistLayers', () => {
  it('should hoist layers', () => {
    const styles = {
      '@layer test': {
        color: 'red',
      },
      div: {
        '@layer': 'nested, test',
        '@layer nested': {
          background: 'blue',
        },
      },
      span: {
        '@layer': 'test2',
      }
    };
    expect(
      _hoistLayers(styles, styles),
    ).toEqual({
      '@layer': ['nested, test', 'test2'],
      '@layer test': {
        color: 'red',
      },
      div: {
        '@layer nested': {
          background: 'blue',
        },
      },
      span: {}
    });
  });
});
