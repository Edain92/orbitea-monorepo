import { Identifier } from '../../../core/domain/Identifier';

describe('Identifier', () => {
  it('Should create an instance', () => {
    const id = new Identifier(1);
    expect(id).toBeInstanceOf(Identifier);
  });

  it('Should return the same value when calling toValue', () => {
    const value = 1;
    const id = new Identifier(value);
    expect(id.toValue()).toBe(value);
  });

  it('Should return a string representation when calling toString', () => {
    const value = 1;
    const id = new Identifier(value);
    expect(id.toString()).toBe(String(value));
  });

  it('Should return true for equals if the values are the same', () => {
    const value = 1;
    const id1 = new Identifier(value);
    const id2 = new Identifier(value);
    expect(id1.equals(id2)).toBe(true);
  });

  it('Should return false for equals if the values are different', () => {
    const value1 = 1;
    const value2 = 2;
    const id1 = new Identifier(value1);
    const id2 = new Identifier(value2);
    expect(id1.equals(id2)).toBe(false);
  });

  it('Should return false for equals if the provided id is null', () => {
    const value = 1;
    const id = new Identifier(value);
    expect(id.equals(null)).toBe(false);
  });

  it('Should return false for equals if the provided id is undefined', () => {
    const value = 1;
    const id = new Identifier(value);
    expect(id.equals(undefined)).toBe(false);
  });
});
