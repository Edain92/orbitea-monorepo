import { DestinationLocation } from '../../../modules/value-objects/DestinationLocation';

describe('ValueObject: DestinationLocation', () => {
  describe('Testing create', () => {
    it('Should return a Result.fail when the location is empty', () => {
      const result = DestinationLocation.create('');
      expect(result.isFailure).toBe(true);
    });

    it('Should return a Result.fail when the location length is less than 2', () => {
      const result = DestinationLocation.create('c');
      expect(result.isFailure).toBe(true);
    });

    it('Should return a Result.fail when the location length is greater than 120', () => {
      const result = DestinationLocation.create('c'.repeat(51));
      expect(result.isFailure).toBe(true);
    });

    it('Should return a Result.ok when the location length is within the valid range', () => {
      const result = DestinationLocation.create('This is a valid location');
      expect(result.isSuccess).toBe(true);

      const location = result.getValue();
      expect(location.value).toBe('This is a valid location');
    });

    it('Should fail to create a DestinationLocation object for a null object', () => {
      const result = DestinationLocation.create(null);

      expect(result.isFailure).toBe(true);
    });
  });
});
