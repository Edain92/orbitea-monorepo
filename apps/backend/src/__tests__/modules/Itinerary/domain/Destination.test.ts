import { Destination } from '../../../../modules/Itinerary/domain/Destination';
import { DestinationLocation } from '../../../../modules/Itinerary/domain/DestinationLocation';
import { DestinationName } from '../../../../modules/Itinerary/domain/DestinationName';
import { Attraction } from '../../../../modules/Itinerary/domain/Attraction';

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
