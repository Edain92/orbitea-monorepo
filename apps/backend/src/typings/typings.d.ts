type DestinationProps = {
  location: DestinationLocation;
  name: DestinationName;
  attractions: Attraction[];
};

type ActivityProps = {
  description: ActivityDescription;
  type: ActivityType[];
};

type TimeFrameProps = {
  start: Date;
  end: Date;
};

interface IDomainEvent {
  dateTimeOccurred: Date;
  getAggregateId(): UniqueEntityID;
}

interface IHandle {
  setupSubscriptions(): void;
}
