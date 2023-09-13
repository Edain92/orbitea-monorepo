import { ValueObject } from '../../../core/domain/ValueObject';
import { Result } from '../../../core/logic/Result';
import { Guard, IGuardResult } from '../../../core/logic/Guard';
import { PASSWORD_PATTERN } from '../../../constants/patterns';

interface UserPasswordProps {
  value: string;
}

export class UserPassword extends ValueObject<UserPasswordProps> {
  private constructor(props: UserPasswordProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(password: string): Result<UserPassword> {
    const nullGuardResult = Guard.againstNullOrUndefined(password, 'password');

    if (!nullGuardResult.succeeded) {
      return Result.fail<UserPassword>(nullGuardResult.message);
    }

    const passwordGuardResult = UserPassword.isValidPassword(password);

    if (!passwordGuardResult.succeeded) {
      return Result.fail<UserPassword>(passwordGuardResult.message);
    }

    return Result.ok<UserPassword>(new UserPassword({ value: password }));
  }

  private static isValidPassword(password: string): IGuardResult {
    return Guard.validPattern(password, PASSWORD_PATTERN, 'password');
  }
}
