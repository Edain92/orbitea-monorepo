import { AggregateRoot } from '../../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../../core/domain/UniqueEntityID';
import { Result } from '../../../core/logic/Result';
import { Guard } from '../../../core/logic/Guard';
import { Activity } from './Activity';
import { ItineraryId } from './ItineraryID';
import { Destination } from './Destination';
import { TimeFrame } from './TimeFrame';
import { ItineraryCreatedEvent } from './events/itineraryCreatedEvent';

interface ItineraryProps {
  destination: Destination;
  activities: Activity[];
  timeFrame: TimeFrame;
}

export class Itinerary extends AggregateRoot<ItineraryProps> {
  get itinerarylId(): ItineraryId {
    return ItineraryId.create(this.id);
  }

  get destination(): Destination {
    return this.props.destination;
  }

  get activities(): Activity[] {
    return this.props.activities;
  }

  get timeFrame(): TimeFrame {
    return this.props.timeFrame;
  }

  private constructor(props: ItineraryProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: ItineraryProps,
    id?: UniqueEntityID,
  ): Result<Itinerary> {
    const propsResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.destination, argumentName: 'destination' },
      { argument: props.activities, argumentName: 'activities' },
      { argument: props.timeFrame, argumentName: 'timeFrame' },
    ]);

    if (!propsResult.succeeded) {
      return Result.fail<Itinerary>(propsResult.message);
    }

    const itinerary = new Itinerary(
      {
        ...props,
      },
      id,
    );
    const isNewlyCreated = !!id === false;

    if (isNewlyCreated) {
      itinerary.addDomainEvent(new ItineraryCreatedEvent(itinerary));
    }

    return Result.ok<Itinerary>(itinerary);
  }
}
