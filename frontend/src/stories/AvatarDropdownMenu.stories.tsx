import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AvatarDropdownMenu } from '../components/avatarDropdownMenu/AvatarDropdownMenu';

export default {
  title: 'Avatar Dropdown Menu',
  component: AvatarDropdownMenu,
} as ComponentMeta<typeof AvatarDropdownMenu>;

const Template: ComponentStory<typeof AvatarDropdownMenu> = (args) => (
  <AvatarDropdownMenu {...args} />
);

export const Main = Template.bind({});
Main.args = {};
