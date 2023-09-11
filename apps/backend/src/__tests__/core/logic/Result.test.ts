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

  it('Should throw an error when trying to get the value of a failing result', () => {
    const error = 'failure';
    const result = Result.fail(error);

    expect(() => result.getValue()).toThrow();
  });

  it('Should combine results and return the first failure', () => {
    const successResult = Result.ok('success');
    const failureResult = Result.fail('failure');
    const combinedResult = Result.combine([successResult, failureResult]);

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
