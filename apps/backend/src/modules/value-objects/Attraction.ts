import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

interface AttractionProps {
  value: string;
}

export class Attraction extends ValueObject<AttractionProps> {
  private constructor(props: AttractionProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(attraction: string): Result<Attraction> {
    const nullGuardResult = Guard.againstNullOrUndefined(
      attraction,
      'attraction',
    );

    if (!nullGuardResult.succeeded) {
      return Result.fail<Attraction>(nullGuardResult.message);
    }

    const attractionLengthGuardResult = Guard.inRange(
      attraction.length,
      5,
      250,
      'attraction',
    );

    if (!attractionLengthGuardResult.succeeded) {
      return Result.fail<Attraction>(attractionLengthGuardResult.message);
    }

    return Result.ok<Attraction>(new Attraction({ value: attraction }));
  }
}
