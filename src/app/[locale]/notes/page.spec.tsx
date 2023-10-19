import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import getNotesByCursor from '@/queries/getNotesByCursor';

import NotesContext from '@/contexts/NotesContext';
import NotesContainer from '@/components/NotesContainer';
import { auth } from '@/util/auth';
import Page from './page';

// Arrange
jest.mock('@/components/NotesContainer');
const mockNotes = jest.mocked(NotesContainer);

jest.mock('@/util/auth', jest.fn(() => ({
  auth: jest.fn().mockResolvedValue({ user: { id: 9 } }),
})));
const mockAuth = jest.mocked(auth);

jest.mock('@/queries/getNotesByCursor');
const mockGetNotesByCursor = jest.mocked(getNotesByCursor);

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
  it('should render the Notes component with notes for the session user', async () => {
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
    expect(mockAuth).toHaveBeenCalled();
    expect(mockGetNotesByCursor).toHaveBeenCalledWith(9);
    expect(mockNotesContextProvider).toHaveBeenCalledWith(expect.objectContaining({
      value: expect.objectContaining(notesData),
    }), expect.anything());
    expect(mockNotes).toHaveBeenCalled();
  });
});
