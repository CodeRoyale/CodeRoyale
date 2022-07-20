import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CurrentRoomCard } from '../components/CurrentRoomCard';

export default {
  title: 'CurrentRoomCard',
  component: CurrentRoomCard,
} as ComponentMeta<typeof CurrentRoomCard>;

const Template: ComponentStory<typeof CurrentRoomCard> = (args) => (
  <CurrentRoomCard {...args} />
);

export const Main = Template.bind({});
Main.args = {
  title: 'Sample Room',
  creatorUsername: 'joelmathew',
};
