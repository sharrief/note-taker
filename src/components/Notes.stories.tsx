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
        id: 1, text: 'first note', text_json: 'first note', userId: 1,
      },
      {
        id: 2, text: 'second note', text_json: 'second note', userId: 1,
      },
      {
        id: 3, text: 'third note', text_json: 'third note', userId: 1,
      },
      {
        id: 4, text: 'fourth note', text_json: 'fourth note', userId: 1,
      },
      {
        id: 5, text: 'fifth note', text_json: 'fifth note', userId: 1,
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
        id: 1, text: 'first note', text_json: 'first note', userId: 1,
      },
      {
        id: 2, text: 'second note', text_json: 'second note', userId: 1,
      },
      {
        id: 3, text: 'third note', text_json: 'third note', userId: 1,
      },
      {
        id: 4, text: 'fourth note', text_json: 'fourth note', userId: 1,
      },
      {
        id: 5, text: 'fifth note', text_json: 'fifth note', userId: 1,
      },
    ],
    firstPage: false,
    remaining: 5,
    next: 5,
  },
};
