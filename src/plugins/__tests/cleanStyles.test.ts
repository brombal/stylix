import { _cleanStyles } from '../cleanStyles';

describe('cleanStyles', () => {
  it('should clean styles', () => {
    expect(
      _cleanStyles({
        a: false,
        b: null,
        c: undefined,
        d: { a: false, b: null, c: undefined },
      }),
    ).toEqual(undefined);
  });
});
