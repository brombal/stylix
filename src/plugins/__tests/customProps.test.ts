import { _customPropsProcess, customProps } from '../customProps';

describe('customProps plugin', () => {
  const myCustomProps = {
    colour: 'color',
    flexbox: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    flexBlue: {
      flexbox: true,
      colour: 'blue',
    },
    marginArray: (trbl: number[]) => ({
      marginTop: trbl[0],
      marginRight: trbl[1],
      marginBottom: trbl[2],
      marginLeft: trbl[3],
    }),
    unknown: 123,
  };
  // Processes the prop names:
  customProps(myCustomProps);

  it('should convert string map', () => {
    expect(_customPropsProcess({ colour: 'red' }, myCustomProps)).toEqual({ color: 'red' });
  });

  it('should convert object map', () => {
    expect(_customPropsProcess({ flexbox: true }, myCustomProps)).toEqual({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
    });
  });

  it('should ignore object map when value is falsy', () => {
    expect(_customPropsProcess({ flexbox: undefined }, myCustomProps)).toEqual({});
    expect(_customPropsProcess({ flexbox: false }, myCustomProps)).toEqual({});
    expect(_customPropsProcess({ flexbox: null }, myCustomProps)).toEqual({});
  });

  it('should convert nested custom props', () => {
    expect(_customPropsProcess({ div: { flexBlue: true } }, myCustomProps)).toEqual({
      div: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        color: 'blue',
      },
    });
  });

  it('should convert function prop', () => {
    expect(_customPropsProcess({ marginArray: [1, 2, 3, 4] }, myCustomProps)).toEqual({
      marginTop: 1,
      marginRight: 2,
      marginBottom: 3,
      marginLeft: 4,
    });
  });

  it('should ignore unknown type', () => {
    expect(_customPropsProcess({ unknown: 'unknown' }, myCustomProps)).toEqual({
      unknown: 'unknown',
    });
  });

  it('should correctly process array of styles', () => {
    expect(_customPropsProcess([{ flexbox: true }, { colour: 'red' }], myCustomProps)).toEqual([
      {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
      { color: 'red' },
    ]);
  });
});
