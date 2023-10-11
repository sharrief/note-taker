import type { Meta, StoryObj } from '@storybook/react';
import Notes from './Notes';

const meta: Meta<typeof Notes> = {
  title: 'Notes',
  component: Notes,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Notes>;

export const NoNotes: Story = {
  args: {
    notes: [],
    firstPage: true,
    remaining: 0,
    next: 0,
  },
};
export const OnePage: Story = {
  args: {
    notes: [
      {
        id: 1, text: 'first note', userId: 1, tags: [{ id: 1, name: 'test', userId: 1 }],
      },
      {
        id: 2, text: 'second note', userId: 1, tags: [],
      },
      {
        id: 3, text: 'third note', userId: 1, tags: [],
      },
      {
        id: 4, text: 'fourth note', userId: 1, tags: [],
      },
      {
        id: 5, text: 'fifth note', userId: 1, tags: [],
      },
    ],
    firstPage: true,
    remaining: 0,
    next: 5,
  },
};
export const LaterPage: Story = {
  args: {
    notes: [
      {
        id: 1, text: 'first note', userId: 1, tags: [{ id: 1, name: 'test', userId: 1 }],
      },
      {
        id: 2, text: 'second note', userId: 1, tags: [],
      },
      {
        id: 3, text: 'third note', userId: 1, tags: [],
      },
      {
        id: 4, text: 'fourth note', userId: 1, tags: [],
      },
      {
        id: 5, text: 'fifth note', userId: 1, tags: [],
      },
    ],
    firstPage: false,
    remaining: 5,
    next: 5,
  },
};
