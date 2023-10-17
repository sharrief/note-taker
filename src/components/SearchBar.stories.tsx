import type { Meta, StoryObj } from '@storybook/react';
import SearchBar from './SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Search bar',
  component: SearchBar,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Initial: Story = {
  args: {
    search: '',
    placeholder: 'Search your notes',
    buttonText: 'Search',
    busy: false,
  },
};
export const SearchEntered: Story = {
  args: {
    search: 'My note',
    placeholder: 'Search your notes',
    buttonText: 'Search',
  },
};

export const SearchLoading: Story = {
  args: {
    search: 'My note',
    placeholder: 'Search your notes',
    buttonText: 'Search',
    busyText: 'Searching',
    busy: true,
  },
};
