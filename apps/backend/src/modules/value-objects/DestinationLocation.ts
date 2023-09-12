import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

interface DestinationLocationProps {
  value: string;
}

export class DestinationLocation extends ValueObject<DestinationLocationProps> {
  private constructor(props: DestinationLocationProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(location: string): Result<DestinationLocation> {
    const nullGuardResult = Guard.againstNullOrUndefined(location, 'location');

    if (!nullGuardResult.succeeded) {
      return Result.fail<DestinationLocation>(nullGuardResult.message);
    }

    const locationLengthGuardResult = Guard.inRange(
      location.length,
      2,
      50,
      'location',
    );

    if (!locationLengthGuardResult.succeeded) {
      return Result.fail<DestinationLocation>(
        locationLengthGuardResult.message,
      );
    }

    return Result.ok<DestinationLocation>(
      new DestinationLocation({ value: location }),
    );
  }
}
