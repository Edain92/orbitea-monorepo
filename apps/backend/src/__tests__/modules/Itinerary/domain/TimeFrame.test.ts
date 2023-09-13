import { TimeFrame } from '../../../../modules/Itinerary/domain/TimeFrame';

describe('TimeFrame', () => {
  it('Should create a valid TimeFrame object', () => {
    const validProps = {
      start: new Date(),
      end: new Date(),
    };

    const result = TimeFrame.create(validProps);

    expect(result.isSuccess).toBe(true);
    expect(result.getValue()).toBeInstanceOf(TimeFrame);
  });
});
