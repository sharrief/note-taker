import { env } from 'process';

const minLength = +env.NEXT_PUBLIC_OPTION_NOTE_MIN_LENGTH;
const maxLength = +env.NEXT_PUBLIC_OPTION_NOTE_MAX_LENGTH;

describe('the environment', () => {
  it('has a var named NEXT_PUBLIC_OPTION_NOTE_MIN_LENGTH set to an integer', () => {
    expect(typeof (+minLength)).toBe('number');
    expect(+minLength % 1).toBe(0);
  });
  it('has a var named NEXT_PUBLIC_OPTION_NOTE_MAX_LENGTH set to an integer', () => {
    expect(typeof (+maxLength)).toBe('number');
    expect(+maxLength % 1).toBe(0);
  });
  it('has a max note text length greater than the min length', () => {
    expect(
      minLength !== maxLength
      && minLength < maxLength,
    );
  });
  it('has a var named NEXT_PUBLIC_OPTION_NOTES_PER_PAGE set to an integer', () => {
    expect(typeof (+maxLength)).toBe('number');
    expect(+maxLength % 1).toBe(0);
  });
});
