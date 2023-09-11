import { Result, left, right } from '../../../core/logic/Result';

describe('Result', () => {
  it('Should create a successful result with a value', () => {
    const value = 'success';
    const result = Result.ok(value);

    expect(result.isSuccess).toBe(true);
    expect(result.isFailure).toBe(false);
    expect(result.getValue()).toBe(value);
  });

  it('Should create a failing result with an error', () => {
    const error = 'failure';
    const result = Result.fail(error);

    expect(result.isSuccess).toBe(false);
    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toBe(error);
  });

  it('Should throw an error when creating a successful result with an error', () => {
    expect(() => new Result(true, 'Error message')).toThrow(
      'InvalidOperation: A result cannot be successful and contain an error',
    );
  });

  it('Should throw an error when creating a failing result without an error', () => {
    expect(() => new Result(false)).toThrow(
      'InvalidOperation: A failing result needs to contain an error message',
    );
  });

  it('Should throw an error when trying to get the value of a failing result', () => {
    const error = 'failure';
    const result = Result.fail(error);

    expect(() => result.getValue()).toThrow();
  });

  it('Should combine results and return success when all results are successful', () => {
    const successResult1 = Result.ok('success 1');
    const successResult2 = Result.ok('success 2');
    const successResult3 = Result.ok('success 3');

    const combinedResult = Result.combine([successResult1, successResult2, successResult3]);

    expect(combinedResult.isSuccess).toBe(true);
    expect(combinedResult.error).toBe("");
  });

  it('Should combine results and return the first failure', () => {
    const successResult = Result.ok('success');
    const failureResult = Result.fail('failure');
    const anotherFailureResult = Result.fail('another failure');

    const combinedResult = Result.combine([successResult, failureResult, anotherFailureResult]);

    expect(combinedResult.isFailure).toBe(true);
    expect(combinedResult.errorValue()).toBe('failure');
  });
});

describe('Either', () => {
  it('Should create a Left instance', () => {
    const leftValue = 'left';
    const either = left(leftValue);

    expect(either.isLeft()).toBe(true);
    expect(either.isRight()).toBe(false);
    expect(either.value).toBe(leftValue);
  });

  it('Should create a Right instance', () => {
    const rightValue = 'right';
    const either = right(rightValue);

    expect(either.isLeft()).toBe(false);
    expect(either.isRight()).toBe(true);
    expect(either.value).toBe(rightValue);
  });
});
