import { ActivityDescription } from '../../../modules/value-objects/ActivityDescription';

describe('ValueObject: ActivityDescription', () => {
  describe('Testing create', () => {
    it('Should return a Result.fail when the description is empty', () => {
      const result = ActivityDescription.create('');
      expect(result.isFailure).toBe(true);
    });

    it('Should return a Result.fail when the description length is less than 25', () => {
      const result = ActivityDescription.create('cc');
      expect(result.isFailure).toBe(true);
    });

    it('Should return a Result.fail when the description length is greater than 500', () => {
      const result = ActivityDescription.create('c'.repeat(501));
      expect(result.isFailure).toBe(true);
    });

    it('Should return a Result.ok when the description length is within the valid range', () => {
      const result = ActivityDescription.create('This is a valid description');
      expect(result.isSuccess).toBe(true);

      const description = result.getValue();
      expect(description.value).toBe('This is a valid description');
    });

    it('Should fail to create a ActivityDescription object for a null object', () => {
      const result = ActivityDescription.create(null);

      expect(result.isFailure).toBe(true);
    });
  });
});
