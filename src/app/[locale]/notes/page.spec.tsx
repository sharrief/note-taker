import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import getNotesByCursor from '@/queries/getNotesByCursor';

import NotesContext from '@/contexts/NotesContext';
import NotesContainer from '@/components/NotesContainer';
import Page from './page';

// Arrange
jest.mock('@/components/NotesContainer');
const mockNotes = jest.mocked(NotesContainer);

jest.mock('@/db/getNotesByCursor');
jest.mock('@/contexts/NotesContext', () => ({
  Provider: jest.fn(({ children }) => children),
}));
const mockNotesContextProvider = jest.mocked(NotesContext.Provider);
jest.mock('@/contexts/SearchContext', () => ({
  Provider: jest.fn(({ children }) => children),
}));
afterEach(() => {
  jest.resetAllMocks();
});

describe('<NotesPage />', () => {
  it('should render the Notes component', async () => {
    // Arrange
    const notesData = {
      notes: [{
        id: 1,
        text: '1',
        text_json: '',
        userId: 1,
        tags: [],
      }],
      remaining: 1,
    };
    jest.mocked(getNotesByCursor)
      .mockImplementationOnce(async () => notesData);
    // Act
    const page = await Page();
    render(page);
    // Assert
    expect(mockNotesContextProvider).toHaveBeenCalledWith(expect.objectContaining({
      value: expect.objectContaining(notesData),
    }), expect.anything());
    expect(mockNotes).toHaveBeenCalled();
  });
});
