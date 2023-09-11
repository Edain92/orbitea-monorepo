import { Guard } from '../../../core/logic/Guard';

describe('Guard', () => {
  describe('combine', () => {
    it('Should return succeeded when all guard results are succeeded', () => {
      const guardResults = [{ succeeded: true }, { succeeded: true }];
      const combinedResult = Guard.combine(guardResults);

      expect(combinedResult.succeeded).toBe(true);
    });

    it('Should return the first failed result', () => {
      const guardResults = [
        { succeeded: true },
        { succeeded: false, message: 'Test message' },
        { succeeded: false, message: 'Another message' },
      ];
      const combinedResult = Guard.combine(guardResults);

      expect(combinedResult.succeeded).toBe(false);
      expect(combinedResult.message).toBe('Test message');
    });
  });

  describe('againstNullOrUndefined', () => {
    it('Should return succeeded when the argument is not null or undefined', () => {
      const result = Guard.againstNullOrUndefined('test', 'argumentName');

      expect(result.succeeded).toBe(true);
    });

    it('Should return failed when the argument is null or undefined', () => {
      const result = Guard.againstNullOrUndefined(null, 'argumentName');

      expect(result.succeeded).toBe(false);
      expect(result.message).toBe('argumentName is null or undefined');
    });
  });

  describe('againstNullOrUndefinedBulk', () => {
    it('Should return succeeded when all arguments are not null or undefined', () => {
      const args = [
        { argument: 'test1', argumentName: 'arg1' },
        { argument: 'test2', argumentName: 'arg2' },
      ];
      const result = Guard.againstNullOrUndefinedBulk(args);

      expect(result.succeeded).toBe(true);
    });

    it('Should return the first failed argument', () => {
      const args = [
        { argument: 'test1', argumentName: 'arg1' },
        { argument: null, argumentName: 'arg2' },
        { argument: 'test3', argumentName: 'arg3' },
      ];
      const result = Guard.againstNullOrUndefinedBulk(args);

      expect(result.succeeded).toBe(false);
      expect(result.message).toBe('arg2 is null or undefined');
    });
  });

  describe('isOneOf', () => {
    it('Should return succeeded when the value is one of the valid values', () => {
      const validValues = ['value1', 'value2', 'value3'];
      const result = Guard.isOneOf('value2', validValues, 'argumentName');

      expect(result.succeeded).toBe(true);
    });

    it('Should return failed when the value is not one of the valid values', () => {
      const validValues = ['value1', 'value2', 'value3'];
      const result = Guard.isOneOf('value4', validValues, 'argumentName');

      expect(result.succeeded).toBe(false);
      expect(result.message).toBe(
        'argumentName isn\'t oneOf the correct types in ["value1","value2","value3"]. Got "value4".'
      );
    });
  });

  describe('inRange', () => {
    it('Should return succeeded when the number is within the range', () => {
      const result = Guard.inRange(5, 1, 10, 'argumentName');

      expect(result.succeeded).toBe(true);
    });

    it('Should return failed when the number is not within the range', () => {
      const result = Guard.inRange(15, 1, 10, 'argumentName');

      expect(result.succeeded).toBe(false);
      expect(result.message).toBe('argumentName is not within range 1 to 10.');
    });
  });

  describe('allInRange', () => {
    it('Should return succeeded when all numbers are within the range', () => {
      const numbers = [2, 5, 8];
      const result = Guard.allInRange(numbers, 1, 10, 'argumentName');

      expect(result.succeeded).toBe(true);
    });

    it('Should return failed when at least one number is not within the range', () => {
      const numbers = [2, 15, 8];
      const result = Guard.allInRange(numbers, 1, 10, 'argumentName');

      expect(result.succeeded).toBe(false);
      expect(result.message).toBe('argumentName is not within the range.');
    });
  });

  describe('validPattern', () => {
    it('Should return succeeded when the value follows the pattern', () => {
      const pattern = '\\d{3}-\\d{2}-\\d{4}';
      const result = Guard.validPattern('123-45-6789', pattern, 'argumentName');

      expect(result.succeeded).toBe(true);
    });

    it('Should return failed when the value does not follow the pattern', () => {
      const pattern = '\\d{3}-\\d{2}-\\d{4}';
      const result = Guard.validPattern('12-45-6789', pattern, 'argumentName');

      expect(result.succeeded).toBe(false);
      expect(result.message).toBe('argumentName is not following the pattern provided: \\d{3}-\\d{2}-\\d{4}.');
    });
  });
});
