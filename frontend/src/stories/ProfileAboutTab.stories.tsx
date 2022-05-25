import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { ProfileAboutTab } from '../components/profileTabs/ProfileAboutTab';

export default {
  title: 'Profile About Tab',
  component: ProfileAboutTab,
} as ComponentMeta<typeof ProfileAboutTab>;

const Template: ComponentStory<typeof ProfileAboutTab> = (args) => (
  <ProfileAboutTab {...args} />
);

export const main = Template.bind({});
main.args = {
  username: 'joelamthewkoshy',
  followers: 24,
  following: 45,
  bio: 'hello world',
  email: 'joelmathew@joel.com',
};
