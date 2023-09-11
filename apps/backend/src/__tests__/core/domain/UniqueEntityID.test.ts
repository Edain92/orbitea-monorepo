import { UniqueEntityID } from '../../../core/domain/UniqueEntityID';

describe('UniqueEntityID', () => {
  it('Should create an instance with a unique value', () => {
    const id = new UniqueEntityID();
    expect(id).toBeInstanceOf(UniqueEntityID);
    expect(typeof id.toValue()).toBe('string');
    expect(id.toValue()).toHaveLength(36);
  });

  it('Should create an instance with a specific value', () => {
    const value = 'specific-value';
    const id = new UniqueEntityID(value);
    expect(id.toValue()).toBe(value);
  });

  it('Should create an instance with a specific number value', () => {
    const value = 123;
    const id = new UniqueEntityID(value);
    expect(id.toValue()).toBe(value);
  });

  it('Should create an instance with a random UUID if no value is provided', () => {
    const id = new UniqueEntityID();
    expect(typeof id.toValue()).toBe('string');
    expect(id.toValue()).toHaveLength(36);
  });
});
