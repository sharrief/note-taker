import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import labels from '@/app/i18n/locales/en/draft.json';
import { env } from 'process';
import api from '@/app/api';
import Page from './page';

// Arrange
jest.mock('@/app/api');
const mockApi = jest.mocked(api);
jest.mock('@/app/i18n/client', () => () => ({
  t: jest.fn().mockImplementation((label: keyof typeof labels) => labels[label]),
}));

const mockReplace = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      replace: mockReplace,
    };
  },
}));

const minLength = +env.OPTION_NOTE_MIN_LENGTH;
const maxLength = +env.OPTION_NOTE_MAX_LENGTH;
let textArea: HTMLElement;
let saveButton: HTMLElement;
let cancelButton: HTMLElement;
const genText = (length: number) => (new Array(Math.floor(length)).fill('x').join(''));

beforeEach(() => {
  render(<Page />);
  textArea = screen.getByPlaceholderText(labels.typeHere);
  saveButton = screen.getByText(labels.save, { selector: 'button' });
  cancelButton = screen.getByText(labels.cancel, { selector: 'button' });
  mockApi.save.mockImplementation(async () => ({}));
});

describe('on first load', () => {
  // Assert
  it('displays an empty, editable textArea', () => {
    expect(textArea).toBeEnabled();
    expect(textArea.textContent).toBe('');
  });
  it('displays a enabled cancel button', () => {
    expect(cancelButton).toBeEnabled();
  });
  it('displays a disabled save button', () => {
    expect(saveButton).toBeDisabled();
  });
});

describe('saving is disabled when', () => {
  // Arrange
  it.each<[string, string]>([
    [
      'text.len == 0', '',
    ],
    [
      'text.len > max',
      genText(maxLength + 1),
    ],
  ])('%s', async (_label, text) => {
    // Act
    if (text) await userEvent.type(textArea, text);
    // Assert
    expect(saveButton).toBeDisabled();
  });
});

describe('saving is enabled when', () => {
  // Arrange
  it.each<[string, string]>([
    [
      'is enabled when text.len == min',
      genText(minLength),
    ],
    [
      'is enabled when min < text.len < max',
      genText((minLength + maxLength) / 2),
    ],
    [
      'is enabled when text.len == max',
      genText(maxLength),
    ],
  ])('%s', async (_label, text) => {
    // Act
    if (text) await userEvent.type(textArea, text);
    // Assert
    expect(saveButton).toBeEnabled();
  });
});

describe('clicking save with valid note text', () => {
  // Arrange
  let text: string;
  beforeEach(async () => {
    text = genText((minLength + maxLength) / 2);
    // Act
    await userEvent.type(textArea, text);
    await userEvent.click(saveButton);
  });
  // #region Assert
  it('posts the note to the api when clicked', async () => {
    expect(api.save).toHaveBeenCalledWith(text);
  });
  it('navigates to the notes page after successful saving', async () => {
    expect(mockReplace).toHaveBeenCalledWith('/notes');
  });
  it('clears the note text after saving', async () => {
    expect(textArea).toHaveTextContent('');
  });
  // #endregion
});
describe('api errors are shown', () => {
  // Arrange
  const error = 'Internal error';
  beforeEach(async () => {
    jest.spyOn(api, 'save').mockImplementation(async (input: string) => ({
      error: input ? error : undefined,
    } as { error?: string }));
  });
  it('when save is clicked', async () => {
    // Act
    const text = genText((minLength + maxLength) / 2);
    await userEvent.type(textArea, text);
    await userEvent.click(saveButton);
    // Assert
    expect(await screen.findByText(error)).toBeInTheDocument();
  });
});
