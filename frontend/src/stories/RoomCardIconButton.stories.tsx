import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IconButton } from '../components/IconButton';

export default {
  title: 'Room Card Icon Button',
  component: IconButton,
} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<typeof IconButton> = (args) => (
  <IconButton {...args} />
);

export const Main = Template.bind({});
Main.args = { icon: 'settings' };
