import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

interface DestinationNameProps {
  value: string;
}

export class DestinationName extends ValueObject<DestinationNameProps> {
  private constructor(props: DestinationNameProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(name: string): Result<DestinationName> {
    const nullGuardResult = Guard.againstNullOrUndefined(name, 'name');

    if (!nullGuardResult.succeeded) {
      return Result.fail<DestinationName>(nullGuardResult.message);
    }

    const nameLengthGuardResult = Guard.inRange(name.length, 2, 120, 'name');

    if (!nameLengthGuardResult.succeeded) {
      return Result.fail<DestinationName>(nameLengthGuardResult.message);
    }

    return Result.ok<DestinationName>(new DestinationName({ value: name }));
  }
}
