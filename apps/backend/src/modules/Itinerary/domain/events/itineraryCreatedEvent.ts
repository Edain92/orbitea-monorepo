import { UniqueEntityID } from '../../../../core/domain/UniqueEntityID';
import { Itinerary } from '../Itinerary';

export class ItineraryCreatedEvent implements IDomainEvent {
  public dateTimeOccurred: Date;
  public itinerary: Itinerary;

  constructor(itinerary: Itinerary) {
    this.dateTimeOccurred = new Date();
    this.itinerary = itinerary;
  }

  getAggregateId(): UniqueEntityID {
    return this.itinerary.id;
  }
}
