import { Result } from './Result';
import { UseCaseError } from './UseCaseError';

export class UnexpectedError extends Result<UseCaseError> {
  public constructor(err: any) {
    super(false, {
      message: `An unexpected error occurred.`,
      error: err,
    } as UseCaseError);
  }

  public static create(err: any): UnexpectedError {
    return new UnexpectedError(err);
  }
}

export const GenericAppError = {
  UnexpectedError,
};
