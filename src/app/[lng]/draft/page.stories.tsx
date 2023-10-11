import type { Meta, StoryObj } from '@storybook/react';
import DraftNotePage from './page';

const meta: Meta<typeof DraftNotePage> = {
  title: 'Draft note page',
  component: DraftNotePage,
};

export default meta;

type Story = StoryObj<typeof DraftNotePage>;

export const Initial: Story = {
};
