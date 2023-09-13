import { User } from '../../../../modules/User/domain/User';
import { UserEmail } from '../../../../modules/User/domain/UserEmail';
import { UserPassword } from '../../../../modules/User/domain/UserPassword';
import { UniqueEntityID } from '../../../../core/domain/UniqueEntityID';
import { UserCreatedEvent } from '../../../../modules/User/domain/events/userCreatedEvent';

describe('User', () => {
  it('Should create a User object with valid properties', () => {
    const email = UserEmail.create('test@example.com').getValue();
    const password = UserPassword.create('P@ssw0rd').getValue();
    const isActive = true;

    const result = User.create({ email, password, isActive });

    expect(result.isSuccess).toBe(true);

    const user = result.getValue();
    expect(user).toBeInstanceOf(User);
    expect(user.email).toBe(email);
    expect(user.password).toBe(password);
    expect(user.isActive).toBe(isActive);
  });

  it('Should generate a UserCreatedEvent when a new User is created', () => {
    const email = UserEmail.create('test@example.com').getValue();
    const password = UserPassword.create('P@ssw0rd').getValue();
    const isActive = true;

    const result = User.create({ email, password, isActive });

    expect(result.isSuccess).toBe(true);

    const user = result.getValue();
    const domainEvents = user.domainEvents;
    expect(domainEvents.length).toBe(1);
    expect(domainEvents[0]).toBeInstanceOf(UserCreatedEvent);
  });

  it('Should have a valid userId', () => {
    const email = UserEmail.create('test@example.com').getValue();
    const password = UserPassword.create('P@ssw0rd').getValue();
    const isActive = true;

    const result = User.create({ email, password, isActive });

    expect(result.isSuccess).toBe(true);

    const user = result.getValue();
    const userId = user.id;
    expect(userId).toBeInstanceOf(UniqueEntityID);
    expect(userId.toString()).toBe(user.id.toString());
  });
});
