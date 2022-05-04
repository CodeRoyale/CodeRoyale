import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import RoomCard from '../components/roomCard/RoomCard';

export default {
  title: 'Room Card',
  component: RoomCard,
} as ComponentMeta<typeof RoomCard>;

const Template: ComponentStory<typeof RoomCard> = (args) => (
  <RoomCard {...args} />
);

export const Main = Template.bind({});
Main.args = {
  title: 'Chirags competition',
  admin: true,
  adminUserName: 'chiragbabulani',
};
