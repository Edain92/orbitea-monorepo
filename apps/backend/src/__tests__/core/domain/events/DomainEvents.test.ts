import { DomainEvents } from '../../../../core/domain/events/DomainEvents';
import { AggregateRoot } from '../../../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../../../core/domain/UniqueEntityID';

class TestAggregate extends AggregateRoot<any> {
  constructor(id: UniqueEntityID) {
    super(id);
  }

  public testAddDomainEvent(event: any): void {
    this.addDomainEvent(event);
  }

  public testClearEvents(): void {
    this.clearEvents();
  }
}

describe('DomainEvents', () => {
  afterEach(() => {
    DomainEvents.clearHandlers();
    DomainEvents.clearMarkedAggregates();
  });

  /*
  it('Should dispatch events for an aggregate', () => {
    const aggregateId = new UniqueEntityID();
    const aggregate = new TestAggregate(aggregateId);

    const event = { name: 'SomeEvent' };
    aggregate.testAddDomainEvent(event);

    DomainEvents.markAggregateForDispatch(aggregate);
    DomainEvents.dispatchEventsForAggregate(aggregateId);

    expect(DomainEvents['markedAggregates']).not.toContain(aggregate);
  });
  */

  it('Should mark an aggregate for dispatch', () => {
    const aggregateId = new UniqueEntityID();
    const aggregate = new TestAggregate(aggregateId);

    DomainEvents.markAggregateForDispatch(aggregate);

    expect(DomainEvents['markedAggregates']).toContain(aggregate);
  });

  it('Should register event handlers', () => {
    const eventHandler = jest.fn();
    const eventClassName = 'SomeEvent';

    DomainEvents.register(eventHandler, eventClassName);

    expect(DomainEvents['handlersMap'][eventClassName]).toContain(eventHandler);
  });

  it('Should clear event handlers', () => {
    const eventHandler = jest.fn();
    const eventClassName = 'SomeEvent';

    DomainEvents.register(eventHandler, eventClassName);
    DomainEvents.clearHandlers();

    expect(DomainEvents['handlersMap']).toEqual({});
  });
});
