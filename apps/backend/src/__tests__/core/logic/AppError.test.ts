import { GenericAppError } from '../../../core/logic/AppError';

describe('GenericAppError.UnexpectedError', () => {
  it('Should create an instance with an unexpected error message', () => {
    const error = new Error('Test error');
    const unexpectedError = new GenericAppError.UnexpectedError(error);

    expect(unexpectedError.isSuccess).toBe(false);
  });

  it('Should create an instance using the static create method', () => {
    const error = new Error('Test error');
    const unexpectedError = GenericAppError.UnexpectedError.create(error);

    expect(unexpectedError.isSuccess).toBe(false);
  });
});
