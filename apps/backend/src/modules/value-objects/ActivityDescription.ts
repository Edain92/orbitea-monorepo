import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

interface ActivityDescriptionProps {
  value: string;
}

export class ActivityDescription extends ValueObject<ActivityDescriptionProps> {
  private constructor(props: ActivityDescriptionProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(description: string): Result<ActivityDescription> {
    const nullGuardResult = Guard.againstNullOrUndefined(
      description,
      'description',
    );

    if (!nullGuardResult.succeeded) {
      return Result.fail<ActivityDescription>(nullGuardResult.message);
    }

    const descriptionLengthGuardResult = Guard.inRange(
      description.length,
      25,
      500,
      'description',
    );

    if (!descriptionLengthGuardResult.succeeded) {
      return Result.fail<ActivityDescription>(
        descriptionLengthGuardResult.message,
      );
    }

    return Result.ok<ActivityDescription>(
      new ActivityDescription({ value: description }),
    );
  }
}
