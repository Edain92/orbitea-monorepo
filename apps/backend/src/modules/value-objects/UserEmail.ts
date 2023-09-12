import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard, IGuardResult } from '../../core/logic/Guard';
import { EMAIL_PATTERN } from '../../constants/patterns';

interface UserEmailProps {
  value: string;
}

export class UserEmail extends ValueObject<UserEmailProps> {
  private constructor(props: UserEmailProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(email: string): Result<UserEmail> {
    const nullGuardResult = Guard.againstNullOrUndefined(email, 'email');

    if (!nullGuardResult.succeeded) {
      return Result.fail<UserEmail>(nullGuardResult.message);
    }

    const emailGuardResult = UserEmail.isEmail(email);

    if (!emailGuardResult.succeeded) {
      return Result.fail<UserEmail>(emailGuardResult.message);
    }

    return Result.ok<UserEmail>(new UserEmail({ value: email }));
  }

  private static isEmail(email: string): IGuardResult {
    return Guard.validPattern(email, EMAIL_PATTERN, 'email');
  }
}
