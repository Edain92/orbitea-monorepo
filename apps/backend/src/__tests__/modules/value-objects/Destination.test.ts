import { Destination } from '../../../modules/value-objects/Destination';
import { DestinationLocation } from '../../../modules/value-objects/DestinationLocation';
import { DestinationName } from '../../../modules/value-objects/DestinationName';
import { Attraction } from '../../../modules/value-objects/Attraction';

describe('Destination', () => {
  it('Should create a valid Destination object', () => {
    const validProps = {
      location: DestinationLocation.create('test'),
      name: DestinationName.create('test'),
      attractions: [Attraction.create('test')],
    };

    const result = Destination.create(validProps);

    expect(result.isSuccess).toBe(true);
    expect(result.getValue()).toBeInstanceOf(Destination);
  });
});
