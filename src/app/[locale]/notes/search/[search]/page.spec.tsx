import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import getNotesBySearch from '@/queries/getNotesBySearch';
import NotesContext from '@/contexts/NotesContext';
import SearchContext from '@/contexts/SearchContext';
import NotesContainer from '@/components/NotesContainer';
import { auth } from '@/util/auth';
import Page from './page';

// Arrange
jest.mock('@/queries/getNotesBySearch');
jest.mock('pg', jest.fn());
const notes = [{
  id: 1,
  text: '1',
  text_json: '1',
  userId: 1,
  text_tsvector: '',
  rank: 0,
  tags: [],
}];

jest.mock('@/components/NotesContainer');
const mockNotesContainer = jest.mocked(NotesContainer);

jest.mock('@/util/auth', jest.fn(() => ({
  auth: jest.fn().mockResolvedValue({ user: { id: 9 } }),
})));
const mockAuth = jest.mocked(auth);

jest.mock('@/queries/getNotesBySearch');
const mockGetNotesBySearch = jest.mocked(getNotesBySearch);

jest.mock('@/contexts/NotesContext', () => ({
  Provider: jest.fn(({ children }) => (children)),
}));
const mockNoteContextProvider = jest.mocked(NotesContext.Provider);

jest.mock('@/contexts/SearchContext', () => ({
  Provider: jest.fn(({ children }) => (children)),
}));
const mockSearchContextProvider = jest.mocked(SearchContext.Provider);

describe('<NotesSearchPage />', () => {
  it('should render the Notes component with the results from the search', async () => {
    // Arrange
    const search = 'test';
    jest.mocked(getNotesBySearch)
      .mockResolvedValue(notes);
    const page = await Page({ params: { search } });
    // Act
    render(page);
    // Assert
    expect(mockAuth).toHaveBeenCalled();
    expect(mockGetNotesBySearch).toHaveBeenCalledWith(9, search);
    expect(mockNoteContextProvider).toHaveBeenCalledWith(
      expect.objectContaining({ value: expect.objectContaining({ notes }) }),
      expect.anything(),
    );
    expect(mockSearchContextProvider).toHaveBeenCalledWith(
      expect.objectContaining({
        value: search,
      }),
      expect.anything(),
    );
    expect(mockNotesContainer).toHaveBeenCalled();
  });
});
