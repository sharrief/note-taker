import post from '@/util/post';
import { save } from './index';

jest.mock('@/util/post');
const mockPost = jest.mocked(post);

describe('save', () => {
  it('returns errors', async () => {
    // Arrange
    const err = 'Internal error';
    const res = new Response(undefined, { status: 500, statusText: err });
    mockPost.mockImplementation(async () => res);
    const text = 'sample note text';
    // Act
    const { error } = await save(text, text);
    // Assert
    expect(error).toBe(err);
  });
});
