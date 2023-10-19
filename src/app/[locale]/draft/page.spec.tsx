import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import * as api from '@/app/api';
import getTranslations from '@/util/getTranslations';
import Page from './page';

// Arrange
jest.mock('@/app/api');
const mockApi = jest.mocked(api);

const t = getTranslations('draft');

const mockReplace = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      replace: mockReplace,
    };
  },
}));

const minLength = +process.env.NEXT_PUBLIC_OPTION_NOTE_MIN_LENGTH;
const maxLength = +process.env.NEXT_PUBLIC_OPTION_NOTE_MAX_LENGTH;
let textArea: HTMLElement;
let saveButton: HTMLElement;
let discardButton: HTMLElement;
let sendSaveResponse: () => void;
const genText = (length: number) => (new Array(Math.floor(length)).fill('x').join(''));

beforeEach(() => {
  render(<Page />);
  textArea = screen.getByPlaceholderText(t('typeHere'));
  saveButton = screen.getByText(t('save'), { selector: 'button' });
  discardButton = screen.getByText(t('discard'), { selector: 'button' });
  mockApi.save.mockImplementation(() => new Promise((resolve) => {
    sendSaveResponse = () => resolve({});
  }));
});
describe.skip('<DraftPage />', () => {
  describe('on first load', () => {
    // Assert
    it('displays an empty, editable textArea', () => {
      expect(textArea).toBeEnabled();
      expect(textArea.textContent).toBe('');
    });
    it('displays a enabled cancel button', () => {
      expect(discardButton).toBeEnabled();
    });
    it('displays a disabled save button', () => {
      expect(saveButton).toBeDisabled();
    });
  });

  describe('warning messages are shown', () => {
    it('text.len < min', async () => {
      if (minLength < 1) return;
      // Arrange
      const lessThanMinText = genText(1);
      // Act
      await userEvent.type(textArea, lessThanMinText);
      // Assert
      const alert = screen.getByTestId('alert');
      expect(alert).toBeInTheDocument();
    });
    it('text.len > max', async () => {
      // Arrange
      const moreThanMaxText = genText(maxLength + 1);
      // Act
      await userEvent.type(textArea, moreThanMaxText);
      // Assert
      const alert = screen.getByTestId('alert');
      expect(alert).toBeInTheDocument();
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

  describe('pressing save with valid note text', () => {
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
    it('disables the controls while the request is processing', async () => {
      expect(discardButton).toBeDisabled();
      expect(saveButton).toBeDisabled();
      expect(textArea).toBeDisabled();
    });
    it('navigates to the notes page after successful saving', async () => {
      await act(async () => sendSaveResponse());
      expect(mockReplace).toHaveBeenCalledWith('/notes');
    });
    it('shows the success message after successful saving', async () => {
      await act(async () => sendSaveResponse());
      const alert = screen.getByTestId('alert');
      expect(alert).toBeInTheDocument();
      expect(alert.classList).toContain('alert-success');
    });
    it('disables the controls after successful saving', async () => {
      await act(async () => sendSaveResponse());
      expect(discardButton).toBeDisabled();
      expect(saveButton).toBeDisabled();
      expect(textArea).toBeDisabled();
    });
  });

  describe('when the api has an error saving', () => {
    // Arrange
    const error = 'Internal error';
    const someText = genText((minLength + maxLength) / 2);
    beforeEach(async () => {
      jest.spyOn(api, 'save').mockImplementation(async (input: string) => ({
        error: input ? error : undefined,
      } as { error?: string }));
    });
    it('the error is shown and the fields/buttons are enabled', async () => {
      // Act
      await userEvent.type(textArea, someText);
      await userEvent.click(saveButton);
      // Assert
      expect(saveButton).toBeEnabled();
      expect(discardButton).toBeEnabled();
      expect(await screen.findByText(error)).toBeInTheDocument();
    });
  });
});
// #endregion