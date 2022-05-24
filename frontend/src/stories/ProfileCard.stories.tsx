import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProfileCard } from '../components/ProfileCard';

export default {
  title: 'Profile Card',
  component: ProfileCard,
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => (
  <ProfileCard {...args} />
);

export const Main = Template.bind({});
Main.args = {
  avatarUrl:
    'https://lh3.googleusercontent.com/a-/AOh14Ghc_V15s5eZUxP0PsKFcNnTX1On7c1UQ4BwSGGW=s96-c',
  username: 'chiragbablani',
  name: 'Chirag Bablani',
  about: 'The best coder/hacker in the World',
  followers: 1204,
  following: 10,
};
