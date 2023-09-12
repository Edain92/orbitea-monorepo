import { ActivityType } from '../../../modules/value-objects/ActivityType';

describe('ValueObject: ActivityType', () => {
  describe('Testing create', () => {
    it('Should return a Result.fail when the activityType is empty', () => {
      const result = ActivityType.create('');
      expect(result.isFailure).toBe(true);
    });

    it('Should return a Result.fail when the activityType length is less than 10', () => {
      const result = ActivityType.create('cc');
      expect(result.isFailure).toBe(true);
    });

    it('Should return a Result.fail when the activityType length is greater than 50', () => {
      const result = ActivityType.create('c'.repeat(51));
      expect(result.isFailure).toBe(true);
    });

    it('Should return a Result.ok when the activityType length is within the valid range', () => {
      const result = ActivityType.create('This is a valid activityType');
      expect(result.isSuccess).toBe(true);

      const activityType = result.getValue();
      expect(activityType.value).toBe('This is a valid activityType');
    });

    it('Should fail to create a ActivityType object for a null object', () => {
      const result = ActivityType.create(null);

      expect(result.isFailure).toBe(true);
    });
  });
});
