import getNotesBySearch from '@/app/api/search/getNotesBySearch';
import { env } from 'process';
/**
 * This test relies on a test db server to validate the query.
 * Other parts of the app rely on prisma, so those tests mock prisma
 * and assert on the args to prisma functions.
 * Full-text search on postgres is not supported by prisma
 * so the function tested here uses native postgres queries.
 * To validate the queries are formatted correctly while mocking
 * pg would require complex parsing of the SQL.
 * So instead this test uses a live test db server to handle the parsing
 * and asserts only on the results of the query.
 * */
describe('getNotesBySearch', () => {
  it('throws if not provided a string', async () => {
    // Act & Assert
    await expect(getNotesBySearch(5 as unknown as string)).rejects.toThrowError('Invalid search');
  });

  it('returns matching rows from the database', async () => {
    // Act
    const rows = await getNotesBySearch('one');
    // Assert
    expect(rows).toHaveLength(2);
    expect(rows[0]).toHaveProperty('id');
    expect(rows[0]).toHaveProperty('rank');
    expect(rows[0]).toHaveProperty('text_tsvector');
    expect(rows[0]).toHaveProperty('text');
    expect(rows[0].rank).toBeGreaterThanOrEqual(rows[1].rank);
    expect(rows.length).toBeLessThanOrEqual(+env.NEXT_PUBLIC_OPTION_NOTES_PER_PAGE);
  });
});
