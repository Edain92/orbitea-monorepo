import { Activity } from '../../../../modules/Itinerary/domain/Activity';
import { ActivityDescription } from '../../../../modules/Itinerary/domain/ActivityDescription';
import { ActivityType } from '../../../../modules/Itinerary/domain/ActivityType';

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
