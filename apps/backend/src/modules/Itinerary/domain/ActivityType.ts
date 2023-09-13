import { ValueObject } from '../../../core/domain/ValueObject';
import { Result } from '../../../core/logic/Result';
import { Guard } from '../../../core/logic/Guard';

interface ActivityTypeProps {
  value: string;
}

export class ActivityType extends ValueObject<ActivityTypeProps> {
  private constructor(props: ActivityTypeProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(activityType: string): Result<ActivityType> {
    const nullGuardResult = Guard.againstNullOrUndefined(
      activityType,
      'activityType',
    );

    if (!nullGuardResult.succeeded) {
      return Result.fail<ActivityType>(nullGuardResult.message);
    }

    const activityTypeLengthGuardResult = Guard.inRange(
      activityType.length,
      10,
      50,
      'activityType',
    );

    if (!activityTypeLengthGuardResult.succeeded) {
      return Result.fail<ActivityType>(activityTypeLengthGuardResult.message);
    }

    return Result.ok<ActivityType>(new ActivityType({ value: activityType }));
  }
}
