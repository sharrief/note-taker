import type { Meta, StoryObj } from '@storybook/react';
import BusyButton from './BusyButton';

const meta: Meta<typeof BusyButton> = {
  title: 'BusyButton',
  component: BusyButton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof BusyButton>;

export const Initial: Story = {
  args: {
    text: 'Click me',
    ariaLabel: 'Pressing here will click the button',
    disabled: false,
    variant: '',
    busy: false,
  },
};

export const Busy: Story = {
  args: {
    text: 'Loading',
    ariaLabel: 'Pressing here will click the button',
    disabled: true,
    variant: '',
    busy: true,
  },
};
