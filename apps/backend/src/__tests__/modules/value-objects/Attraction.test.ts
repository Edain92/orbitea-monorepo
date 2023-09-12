import { Attraction } from '../../../modules/value-objects/Attraction';

describe('ValueObject: Attraction', () => {
  describe('Testing create', () => {
    it('Should return a Result.fail when the attraction is empty', () => {
      const result = Attraction.create('');
      expect(result.isFailure).toBe(true);
    });

    it('Should return a Result.fail when the attraction length is less than 5', () => {
      const result = Attraction.create('cc');
      expect(result.isFailure).toBe(true);
    });

    it('Should return a Result.fail when the attraction length is greater than 250', () => {
      const result = Attraction.create('c'.repeat(251));
      expect(result.isFailure).toBe(true);
    });

    it('Should return a Result.ok when the attraction length is within the valid range', () => {
      const result = Attraction.create('This is a valid attraction');
      expect(result.isSuccess).toBe(true);

      const attraction = result.getValue();
      expect(attraction.value).toBe('This is a valid attraction');
    });

    it('Should fail to create a Attraction object for a null object', () => {
      const result = Attraction.create(null);

      expect(result.isFailure).toBe(true);
    });
  });
});
