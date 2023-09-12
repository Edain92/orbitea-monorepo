import { DestinationName } from '../../../modules/value-objects/DestinationName';

describe('ValueObject: DestinationName', () => {
  describe('Testing create', () => {
    it('Should return a Result.fail when the name is empty', () => {
      const result = DestinationName.create('');
      expect(result.isFailure).toBe(true);
    });

    it('Should return a Result.fail when the name length is less than 10', () => {
      const result = DestinationName.create('');
      expect(result.isFailure).toBe(true);
    });

    it('Should return a Result.fail when the name length is greater than 120', () => {
      const result = DestinationName.create('c'.repeat(121));
      expect(result.isFailure).toBe(true);
    });

    it('Should return a Result.ok when the name length is within the valid range', () => {
      const result = DestinationName.create('This is a valid name');
      expect(result.isSuccess).toBe(true);

      const name = result.getValue();
      expect(name.value).toBe('This is a valid name');
    });

    it('Should fail to create a DestinationName object for a null object', () => {
      const result = DestinationName.create(null);

      expect(result.isFailure).toBe(true);
    });
  });
});
