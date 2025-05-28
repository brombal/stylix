import $, { customProps } from '../index';
import { renderStylix } from './util';

declare module '../types' {
  interface StylixPropsExtensions {
    colour: string;
    flexbox: boolean;
    flexBlue: boolean;
    marginArray: number[];
  }
}

describe('customProps', () => {
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

  it('should apply custom props', () => {
    // @ts-expect-error invalid type
    void (<$.div colour={0} />);
    // @ts-expect-error invalid type
    void (<$.div marginArray="invalid" />);

    const [json, styles] = renderStylix(
      <$.div>
        <$.div colour="red" />
        <$.div flexbox />
        <$.div flexbox={false} />
        <$.div flexBlue />
        <$.div marginArray={[1, 2, 3, 4]} />
      </$.div>,
      [customProps(myCustomProps)],
    );
    expect(json).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });
});
