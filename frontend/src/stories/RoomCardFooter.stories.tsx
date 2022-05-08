import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { RoomCardFooter } from '../components/roomCard/RoomCardFooter';

export default {
  title: 'Room Card Footer',
  component: RoomCardFooter,
} as ComponentMeta<typeof RoomCardFooter>;

const Template: ComponentStory<typeof RoomCardFooter> = (args) => (
  <RoomCardFooter {...args} />
);

export const Main = Template.bind({});
Main.args = {
  admin: true,
};
