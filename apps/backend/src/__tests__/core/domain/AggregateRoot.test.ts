import { AggregateRoot } from '../../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../../core/domain/UniqueEntityID';

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

describe('AggregateRoot', () => {
  it('Should add a domain event', () => {
    const aggregateId = new UniqueEntityID();
    const aggregate = new TestAggregate(aggregateId);

    const domainEvent = { name: 'SomeEvent' };

    aggregate.testAddDomainEvent(domainEvent);

    expect(aggregate.domainEvents).toContain(domainEvent);
  });

  it('Should clear domain events', () => {
    const aggregateId = new UniqueEntityID();
    const aggregate = new TestAggregate(aggregateId);

    const domainEvent = { name: 'SomeEvent' };
    aggregate.testAddDomainEvent(domainEvent);

    aggregate.testClearEvents();

    expect(aggregate.domainEvents.length).toBe(0);
  });
});
