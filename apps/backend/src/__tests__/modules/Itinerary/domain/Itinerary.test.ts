import { Itinerary } from '../../../../modules/Itinerary/domain/Itinerary';
import { Destination } from '../../../../modules/Itinerary/domain/Destination';
import { Activity } from '../../../../modules/Itinerary/domain/Activity';
import { TimeFrame } from '../../../../modules/Itinerary/domain/TimeFrame';
import { UniqueEntityID } from '../../../../core/domain/UniqueEntityID';
import { ItineraryCreatedEvent } from '../../../../modules/Itinerary/domain/events/itineraryCreatedEvent';
import { Attraction } from '../../../../modules/Itinerary/domain/Attraction';
import { DestinationLocation } from '../../../../modules/Itinerary/domain/DestinationLocation';
import { DestinationName } from '../../../../modules/Itinerary/domain/DestinationName';
import { ActivityDescription } from '../../../../modules/Itinerary/domain/ActivityDescription';
import { ActivityType } from '../../../../modules/Itinerary/domain/ActivityType';

describe('Itinerary', () => {
  const destinationProps = {
    location: DestinationLocation.create('test'),
    name: DestinationName.create('test'),
    attractions: [Attraction.create('test attraction')],
  };

  const destination = Destination.create(destinationProps).getValue();

  const activityProps = {
    description: ActivityDescription.create('test'),
    type: [ActivityType.create('test')],
  };

  const activities = [Activity.create(activityProps).getValue()];

  const timeFrameProps = {
    start: new Date(),
    end: new Date(),
  };

  const timeFrame = TimeFrame.create(timeFrameProps).getValue();

  it('Should create an Itinerary object with valid properties', () => {
    const result = Itinerary.create({ destination, activities, timeFrame });

    expect(result.isSuccess).toBe(true);

    const itinerary = result.getValue();
    expect(itinerary).toBeInstanceOf(Itinerary);
    expect(itinerary.destination).toBe(destination);
    expect(itinerary.activities).toEqual(activities);
    expect(itinerary.timeFrame).toBe(timeFrame);
  });

  it('Should generate an ItineraryCreatedEvent when a new Itinerary is created', () => {
    const result = Itinerary.create({ destination, activities, timeFrame });

    expect(result.isSuccess).toBe(true);

    const itinerary = result.getValue();
    const domainEvents = itinerary.domainEvents;
    expect(domainEvents.length).toBe(1);
    expect(domainEvents[0]).toBeInstanceOf(ItineraryCreatedEvent);
  });

  it('Should have a valid ItineraryId', () => {
    const result = Itinerary.create({ destination, activities, timeFrame });

    expect(result.isSuccess).toBe(true);

    const itinerary = result.getValue();
    const itineraryId = itinerary.id;
    expect(itineraryId).toBeInstanceOf(UniqueEntityID);
    expect(itineraryId.toString()).toBe(itinerary.id.toString());
  });
});
