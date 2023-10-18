import type { Meta, StoryObj } from '@storybook/react';
import NoteEditor from './NoteEditor';

const meta: Meta<typeof NoteEditor> = {
  title: 'DraftNote',
  component: NoteEditor,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof NoteEditor>;

const defaultArgs: Story['args'] = {

};

export const Initial: Story = {
  args: {
    ...defaultArgs,
  },
};

export const Saveable: Story = {

};

export const Warning: Story = {

};

export const Error: Story = {

};
