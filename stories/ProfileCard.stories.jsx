import React from 'react';
import ProfileCard from '../components/ProfileCard';

export default {
  title: 'Profile Card',
  component: ProfileCard,
};

const Template = (args) => <ProfileCard {...args} />;

export const Main = Template.bind({});
Main.args = {
  image:
    'https://lh3.googleusercontent.com/a-/AOh14Ghc_V15s5eZUxP0PsKFcNnTX1On7c1UQ4BwSGGW=s96-c',
  userName: 'chiragbablani',
  firstName: 'Chirag',
  lastName: 'Bablani',
  about: 'The best coder/hacker in the World',
  followers: 1204,
  following: 10,
};
