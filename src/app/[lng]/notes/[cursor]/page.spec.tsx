import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Notes from '@/components/Notes';
import { redirect } from 'next/navigation';
import getNotes from '@/app/[lng]/notes/getNotes';
import Page from './page';

// Arrange
const notesProps: Parameters<typeof Notes>[0] = {
  notes: [{
    id: 1,
    text: '1',
    userId: 1,
    tags: [],
  }],
  firstPage: false,
  remaining: 1,
};
jest.mock('@/components/Notes');
const mockNotes = jest.mocked(Notes);

const mockRedirect = jest.mocked(redirect);
jest.mock('next/navigation', () => ({
  redirect: jest.fn().mockReturnValueOnce(null),
}));

jest.mock('@/app/[lng]/notes/getNotes');

afterEach(() => {
  jest.resetAllMocks();
});

describe('<NotesCursorPage />', () => {
  it('should render the Notes component', async () => {
    // Arrange
    jest.mocked(getNotes)
      .mockImplementationOnce(async () => ({
        notes: notesProps.notes, remaining: notesProps.remaining,
      }));
    // Act
    const page = await Page({ params: { cursor: '' } });
    render(page);
    // Assert
    expect(mockNotes).toHaveBeenCalledWith(
      expect.objectContaining(notesProps),
      expect.anything(),
    );
  });
  it('should pass <Notes /> an undefined nextCursor if there are no notes', async () => {
    // Arrange
    jest.mocked(getNotes)
      .mockImplementationOnce(async () => ({
        notes: [], remaining: 0,
      }));
    // Act
    const page = await Page({ params: { cursor: '' } });
    render(page);
    // Assert
    expect(mockNotes).toHaveBeenCalledWith(
      expect.objectContaining({
        ...notesProps, notes: [], next: undefined, remaining: 0,
      }),
      expect.anything(),
    );
  });
  it('should redirect to /notes if an invalid cursor is provided', async () => {
    // Act
    const page = await Page({ params: { cursor: 'invalid' } });
    render(page);
    // Assert
    expect(mockRedirect).toHaveBeenCalledWith('/notes');
    expect(mockNotes).not.toHaveBeenCalled();
  });
});
