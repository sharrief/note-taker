import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Notes from '@/components/Notes';
import Page from './page';
import getNotes from './getNotes';

// Arrange
const notesProps: Parameters<typeof Notes>[0] = {
  notes: [{
    id: 1,
    text: '1',
    userId: 1,
    tag: [],
  }],
  firstPage: true,
  remaining: 1,
};
jest.mock('@/components/Notes');
const mockNotes = jest.mocked(Notes);

jest.mock('./getNotes');

afterEach(() => {
  jest.resetAllMocks();
});

describe('<NotesPage />', () => {
  it('should render the Notes component', async () => {
    // Arrange
    jest.mocked(getNotes)
      .mockImplementationOnce(async () => ({
        notes: notesProps.notes, remaining: notesProps.remaining,
      }));
    // Act
    const page = await Page();
    render(page);
    // Assert
    expect(mockNotes).toHaveBeenCalledWith(
      expect.objectContaining(notesProps),
      expect.anything(),
    );
  });
});
