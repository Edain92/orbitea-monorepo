import { UserPassword } from '../../../../modules/User/domain/UserPassword';

describe('ValueObject: UserPassword', () => {
  const validPassword = 'Password1*';
  const invalidPassword = 'Invalid password';

  it('Should create a UserPassword object for a valid password', () => {
    const result = UserPassword.create(validPassword);
    const userPassword = result.getValue();

    expect(result.isSuccess).toBe(true);
    expect(userPassword.value).toEqual(validPassword);
  });

  it('Should fail to create a UserPassword object for a invalid password', () => {
    const result = UserPassword.create(invalidPassword);

    expect(result.isFailure).toBe(true);
  });

  it('Should fail to create a UserPassword object for a null object', () => {
    const result = UserPassword.create(null);

    expect(result.isFailure).toBe(true);
  });
});
