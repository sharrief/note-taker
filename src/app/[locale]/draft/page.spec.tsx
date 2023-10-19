import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import NoteEditor from '@/components/NoteEditor';
import Page from './page';

// Arrange
jest.mock('@/components/NoteEditor', jest.fn(() => jest.fn(() => <div />)));

describe('<DraftNotePage />', () => {
  it('renders the <NoteEditor />', async () => {
    // Act
    const page = await Page();
    render(page);
    // Assert
    expect(NoteEditor).toHaveBeenCalled();
  });
});
