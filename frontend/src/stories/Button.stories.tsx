import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Button from '../components/Button';

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Main = Template.bind({});
Main.args = {
  size: 'normal',
  children: 'Create Room',
  buttonClass: 'primary',
};
