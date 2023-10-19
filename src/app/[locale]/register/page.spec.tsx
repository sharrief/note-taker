import React from 'react';
import {
  render, screen, fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { signUp } from '@/app/api';
import { AlertProps } from '@/components/Alert';
import Page from './page';

// Arrange
jest.mock('next/image', jest.fn(() => jest.fn(() => <div />)));
const mockUseRegistration = {
  username: '',
  setUsername: jest.fn(),
  password: '',
  setPassword: jest.fn(),
  alert: null as AlertProps | null,
  setAlert: jest.fn(),
  busy: false,
  setBusy: jest.fn(),
  regSuccess: false,
  setRegSuccess: jest.fn(),
};
jest.mock('@/hooks/useRegistrationForm', () => () => (mockUseRegistration));
const error = '';
const message = '';
const mockSignUp = jest.mocked(signUp);
jest.mock('@/app/api', () => ({
  signUp: jest.fn().mockImplementation(async () => ({ error, message })),
}));

describe('<Register />', () => {
  afterEach(() => {
    /** Quickly reset mocks in hook */
    mockUseRegistration.username = '';
    mockUseRegistration.password = '';
    mockUseRegistration.alert = null;
    mockUseRegistration.busy = false;
    mockUseRegistration.regSuccess = false;
  });
  describe('on render', () => {
    it('shows the form', async () => {
      // Arrange | Act
      const page = await Page();
      render(page);
      const usernameField = screen.getByTestId('username');
      const passwordField = screen.getByTestId('password');
      // Assert
      expect(usernameField).toBeInTheDocument();
      expect(usernameField).toBeEnabled();
      expect(usernameField).toHaveValue('');
      expect(passwordField).toBeInTheDocument();
      expect(passwordField).toBeEnabled();
      expect(passwordField).toHaveValue('');
    });
    it('shows the current username and password', async () => {
      // Arrange | Act
      mockUseRegistration.username = 'john';
      mockUseRegistration.password = 'myPass';
      const page = await Page();
      render(page);
      const usernameField = screen.getByTestId('username');
      const passwordField = screen.getByTestId('password');
      // Assert
      expect(usernameField).toHaveValue('john');
      expect(passwordField).toHaveValue('myPass');
    });
    it('shows alerts', async () => {
      // Arrange
      mockUseRegistration.alert = { message: 'Done', type: 'success' };
      // Act
      const page = await Page();
      render(page);
      const alert = screen.getByTestId('alert');
      // Assert
      expect(alert).toBeInTheDocument();
    });
    it('disables the controls', async () => {
      // Arrange
      mockUseRegistration.busy = true;
      // Act
      const page = await Page();
      render(page);
      // Assert
      const usernameField = screen.getByTestId('username');
      const passwordField = screen.getByTestId('password');
      const button = screen.getByText('Sign up', { selector: 'button' });
      expect(usernameField).toBeDisabled();
      expect(passwordField).toBeDisabled();
      expect(button).toBeDisabled();
    });
  });
  describe('can be interacted with', () => {
    beforeEach(async () => {
      // Arrange
      const page = await Page();
      render(page);
    });
    it('by typing a username', async () => {
      // Arrange
      const usernameField = screen.getByTestId('username');
      // Act
      await userEvent.type(usernameField, 'john');
      // Assert
      expect(mockUseRegistration.setUsername).toHaveBeenLastCalledWith('n');
    });
    it('by typing a password', async () => {
      // Arrange
      const passwordField = screen.getByTestId('password');
      // Act
      await userEvent.type(passwordField, 'p');
      // Assert
      expect(mockUseRegistration.setPassword).toHaveBeenLastCalledWith('p');
    });
    it('by submitting the form', async () => {
      // Arrange
      const registerForm = screen.getByTestId('form');
      // Act
      await fireEvent.submit(registerForm);
      // Assert
      expect(mockUseRegistration.setBusy).toHaveBeenCalled();
      expect(mockUseRegistration.setAlert).toHaveBeenCalledWith(null);
      expect(mockSignUp).toHaveBeenCalled();
    });
  });
});
