import { Activity } from '../../../modules/value-objects/Activity';
import { ActivityDescription } from '../../../modules/value-objects/ActivityDescription';
import { ActivityType } from '../../../modules/value-objects/ActivityType';

describe('Activity', () => {
  it('Should create a valid Activity object', () => {
    const validProps = {
      description: ActivityDescription.create('test'),
      type: [ActivityType.create('test')],
    };

    const result = Activity.create(validProps);

    expect(result.isSuccess).toBe(true);
    expect(result.getValue()).toBeInstanceOf(Activity);
  });
});
