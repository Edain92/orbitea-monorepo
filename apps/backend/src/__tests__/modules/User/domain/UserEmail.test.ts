import { UserEmail } from '../../../../modules/User/domain/UserEmail';

describe('ValueObject: UserEmail', () => {
  const validEmail = 'test@test.com';
  const invalidEmail = 'Invalid email';

  it('Should create a UserEmail object for a valid email', () => {
    const result = UserEmail.create(validEmail);
    const userEmail = result.getValue();

    expect(result.isSuccess).toBe(true);
    expect(userEmail.value).toEqual(validEmail);
  });

  it('Should fail to create a UserEmail object for a invalid email', () => {
    const result = UserEmail.create(invalidEmail);

    expect(result.isFailure).toBe(true);
  });

  it('Should fail to create a UserEmail object for a null object', () => {
    const result = UserEmail.create(null);

    expect(result.isFailure).toBe(true);
  });
});
