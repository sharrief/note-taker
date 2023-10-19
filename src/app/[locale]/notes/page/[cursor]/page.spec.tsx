import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { redirect } from 'next/navigation';
import getNotesByCursor from '@/queries/getNotesByCursor';
import NotesContext from '@/contexts/NotesContext';
import NotesContainer from '@/components/NotesContainer';
import Page from './page';

// Arrange
jest.mock('@/components/NotesContainer');
const mockNotesContainer = jest.mocked(NotesContainer);

const mockRedirect = jest.mocked(redirect);
jest.mock('next/navigation', () => ({
  redirect: jest.fn().mockReturnValueOnce(null),
}));

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

describe('<NotesCursorPage />', () => {
  it('should render the Notes component', async () => {
    // Arrange
    const notesData = {
      notes: [{
        id: 1,
        text: '1',
        text_json: '1',
        userId: 1,
        tags: [],
      }],
      remaining: 1,
    };
    jest.mocked(getNotesByCursor)
      .mockImplementationOnce(async () => notesData);
    // Act
    const page = await Page({ params: { cursor: '' } });
    render(page);
    // Assert
    expect(mockNotesContextProvider).toHaveBeenCalledWith(expect.objectContaining({
      value: expect.objectContaining(notesData),
    }), expect.anything());
    expect(mockNotesContainer).toHaveBeenCalled();
  });
  it('should redirect to /notes if an invalid cursor is provided', async () => {
    // Act
    const page = await Page({ params: { cursor: 'invalid' } });
    render(page);
    // Assert
    expect(mockRedirect).toHaveBeenCalledWith('/notes');
    expect(mockNotesContextProvider).not.toHaveBeenCalled();
  });
});
