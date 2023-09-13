import { AggregateRoot } from '../../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../../core/domain/UniqueEntityID';
import { Result } from '../../../core/logic/Result';
import { UserId } from './UserId';
import { UserEmail } from './UserEmail';
import { Guard } from '../../../core/logic/Guard';
import { UserCreatedEvent } from './events/userCreatedEvent';
import { UserPassword } from './UserPassword';

interface UserProps {
  email: UserEmail;
  password: UserPassword;
  isActive: boolean;
}

export class User extends AggregateRoot<UserProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get userId(): UserId {
    return UserId.caller(this.id);
  }

  get email(): UserEmail {
    return this.props.email;
  }

  get password(): UserPassword {
    return this.props.password;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: UserProps, id?: UniqueEntityID): Result<User> {
    const guardedProps = [
      { argument: props.email, argumentName: 'email' },
      { argument: props.isActive, argumentName: 'isActive' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<User>(guardResult.message);
    } else {
      const user = new User(
        {
          ...props,
        },
        id,
      );

      const idWasProvided = !!id;

      if (!idWasProvided) {
        user.addDomainEvent(new UserCreatedEvent(user));
      }

      return Result.ok<User>(user);
    }
  }
}
