import { ValueObject } from '../../../core/domain/ValueObject';
import { Result } from '../../../core/logic/Result';
import { Guard } from '../../../core/logic/Guard';
import { ActivityDescription } from './ActivityDescription';
import { ActivityType } from './ActivityType';

export class Activity extends ValueObject<ActivityProps> {
  private constructor(props: ActivityProps) {
    super(props);
  }

  get description(): ActivityDescription {
    return this.props.description;
  }

  get type(): ActivityType[] {
    return this.props.type;
  }

  public static create(props: ActivityProps): Result<Activity> {
    const nullGuardResult = Guard.againstNullOrUndefinedBulk([
      { argumentName: 'description', argument: props.description },
      { argumentName: 'type', argument: props.type },
    ]);

    if (!nullGuardResult.succeeded) {
      return Result.fail<Activity>(nullGuardResult.message);
    }

    const typeLengthGuardResult = Guard.inRange(
      props.type.length,
      0,
      10,
      'type',
    );

    if (!typeLengthGuardResult.succeeded) {
      return Result.fail<Activity>(typeLengthGuardResult.message);
    }

    return Result.ok<Activity>(new Activity(props));
  }
}
