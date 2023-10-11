import type { Meta, StoryObj } from '@storybook/react';
import Alert from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Alert',
  component: Alert,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: {
    message: 'Hello world!',
    type: 'info',
  },
};
export const Warning: Story = {
  args: {
    message: 'Hello world!',
    type: 'warning',
  },
};
export const Error: Story = {
  args: {
    message: 'Hello world!',
    type: 'error',
  },
};
export const Success: Story = {
  args: {
    message: 'Hello world!',
    type: 'success',
  },
};
