import post from './post';

describe('post', () => {
  it('calls fetch and returns the response', async () => {
    // Arrange
    const mockResponse = {
      json: () => ({
      }),
    };
    global.fetch = jest.fn(async () => (mockResponse) as any);
    const body = { test: 'test' };
    // Act
    const res = await post('/api/test', body);
    // Assert
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/test',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(body),
      }),
    );
    expect(res).toBe(mockResponse);
  });
});
