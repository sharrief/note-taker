import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import getNotesBySearch from '@/app/api/search/getNotesBySearch';
import NotesContext from '@/app/contexts/NotesContext';
import SearchContext from '@/app/contexts/SearchContext';
import NotesContainer from '@/components/NotesContainer';
import Page from './page';

// Arrange
jest.mock('@/app/api/search/getNotesBySearch');
jest.mock('pg', jest.fn());
const notes = [{
  id: 1,
  text: '1',
  userId: 1,
  text_tsvector: '',
  rank: 0,
  tags: [],
}];
jest.mock('@/components/NotesContainer');
const mockNotesContainer = jest.mocked(NotesContainer);

jest.mock('@/app/contexts/NotesContext', () => ({
  Provider: jest.fn(({ children }) => (children)),
}));
const mockNoteContextProvider = jest.mocked(NotesContext.Provider);

jest.mock('@/app/contexts/SearchContext', () => ({
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
