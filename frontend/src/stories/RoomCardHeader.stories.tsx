import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { RoomCardHeader } from '../components/roomCard/RoomCardHeader';

export default {
  title: 'Room Card Header',
  component: RoomCardHeader,
} as ComponentMeta<typeof RoomCardHeader>;

const Template: ComponentStory<typeof RoomCardHeader> = (args) => (
  <RoomCardHeader {...args} />
);

export const Main = Template.bind({});
Main.args = {
  title: 'Chirags Competition',
  creatorUsername: 'chiragbabulani',
};
