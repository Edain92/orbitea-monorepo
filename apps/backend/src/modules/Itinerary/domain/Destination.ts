import { ValueObject } from '../../../core/domain/ValueObject';
import { Result } from '../../../core/logic/Result';
import { Guard } from '../../../core/logic/Guard';
import { DestinationLocation } from './DestinationLocation';
import { DestinationName } from './DestinationName';
import { Attraction } from './Attraction';

export class Destination extends ValueObject<DestinationProps> {
  private constructor(props: DestinationProps) {
    super(props);
  }

  get location(): DestinationLocation {
    return this.props.location;
  }

  get name(): DestinationName {
    return this.props.name;
  }

  get attractions(): Attraction[] {
    return this.props.attractions;
  }

  public static create(props: DestinationProps): Result<Destination> {
    const nullGuardResult = Guard.againstNullOrUndefinedBulk([
      { argumentName: 'location', argument: props.location },
      { argumentName: 'name', argument: props.name },
      { argumentName: 'attractions', argument: props.attractions },
    ]);

    if (!nullGuardResult.succeeded) {
      return Result.fail<Destination>(nullGuardResult.message);
    }

    const attractionsLengthGuardResult = Guard.inRange(
      props.attractions.length,
      0,
      10,
      'attractions',
    );

    if (!attractionsLengthGuardResult.succeeded) {
      return Result.fail<Destination>(attractionsLengthGuardResult.message);
    }

    return Result.ok<Destination>(new Destination(props));
  }
}
