import type { Meta, StoryObj } from '@storybook/react';
import DraftNote from './DraftNote';

const meta: Meta<typeof DraftNote> = {
  title: 'DraftNote',
  component: DraftNote,
  argTypes: {
    setText: { action: true },
    onSave: { action: true },
    onDiscard: { action: true },
  },
};

export default meta;

type Story = StoryObj<typeof DraftNote>;

const defaultArgs: Story['args'] = {
  labels: {
    title: 'Draft note',
    textPlaceholder: 'type here',
    save: 'save',
    aria_saveNote: 'save note',
    discard: 'discard',
    aria_discardNote: 'discard note',
  },
  text: '',
  alertMessage: '',
  alertType: 'info',
  busy: false,
  canSave: false,
  canDiscard: true,
  canType: true,
};

export const Initial: Story = {
  args: {
    ...defaultArgs,
  },
};

export const Saveable: Story = {
  args: {
    ...defaultArgs,
    canSave: true,
    text: 'I have a great idea!',
  },
};

export const Warning: Story = {
  args: {
    ...defaultArgs,
    alertMessage: 'Warning',
    alertType: 'warning',
    text: 'Short note',
  },
};

export const Error: Story = {
  args: {
    ...defaultArgs,
    alertMessage: 'Error',
    alertType: 'error',
    text: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    `,
  },
};
