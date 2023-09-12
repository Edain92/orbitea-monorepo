import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

export class TimeFrame extends ValueObject<TimeFrameProps> {
  private constructor(props: TimeFrameProps) {
    super(props);
  }

  get start(): Date {
    return this.props.start;
  }

  get end(): Date {
    return this.props.end;
  }

  public static create(props: TimeFrameProps): Result<TimeFrame> {
    const nullGuardResult = Guard.againstNullOrUndefinedBulk([
      { argumentName: 'start', argument: props.start },
      { argumentName: 'end', argument: props.end },
    ]);

    if (!nullGuardResult.succeeded) {
      return Result.fail<TimeFrame>(nullGuardResult.message);
    }

    return Result.ok<TimeFrame>(new TimeFrame(props));
  }
}
