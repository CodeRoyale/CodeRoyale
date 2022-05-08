import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { RoomCardIconButton } from '../components/roomCard/RoomCardIconButton';

export default {
  title: 'Room Card Icon Button',
  component: RoomCardIconButton,
} as ComponentMeta<typeof RoomCardIconButton>;

const Template: ComponentStory<typeof RoomCardIconButton> = (args) => (
  <RoomCardIconButton {...args} />
);

export const Main = Template.bind({});
Main.args = { icon: 'settings' };
