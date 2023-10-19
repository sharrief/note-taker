/* eslint-disable implicit-arrow-linebreak */
import _getNotesBySearch from '@/queries/getNotesBySearch';
import searchQueryString from '@/queries/getNotesBySearch.queryString';

// Arrange
jest.mock('@/util/getTranslations', () => jest.fn(() => jest.fn((err) => err)));

const mockRows: { id: number }[] = [];
const mockedQuery = jest.fn().mockResolvedValue({ rows: mockRows });

jest.mock('@/util/db/postgres', jest.fn(() => /* module returns default export function getConnection */
  jest.fn().mockImplementation(() => /* getConnection returns new Pool */
  // Pool returns a client
    ({
      // client has query and end methods
      query: mockedQuery,
      end: jest.fn(),
    }))));

describe('getNotesBySearch', () => {
  const getNotesBySearch = (search: string | number) => _getNotesBySearch(9, search as string);
  it('throws if not provided a string', async () => {
    // Act & Assert
    await expect(getNotesBySearch(5 as unknown as string)).rejects.toThrowError('invalid-search');
  });

  it('returns matching rows from the database', async () => {
    // Act
    const rows = await getNotesBySearch('one');
    // Assert
    expect(mockedQuery).toHaveBeenCalledWith(
      expect.stringContaining(searchQueryString),
      expect.arrayContaining(['one', expect.anything(), 9]),
    );
    expect(rows).toEqual(mockRows);
  });
});
