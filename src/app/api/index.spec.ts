import { test } from './index';

global.fetch = jest.fn(async () => ({
  json: () => ({
  }),
}) as any);

describe('post', () => {
  const { post } = test;
  it('calls fetch', async () => {
    const body = { test: 'test' };
    await post('/api/test', body);
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/test',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(body),
      }),
    );
  });
});
