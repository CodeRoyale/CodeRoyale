import React from 'react';
import RoomInviteCard from '../components/RoomInviteCard';

export default {
  title: 'Room Invite Card',
  component: RoomInviteCard,
};

const Template = (args) => <RoomInviteCard {...args} />;

export const Main = Template.bind({});
Main.args = {
  avatarUrl:
    'https://lh3.googleusercontent.com/a-/AOh14Ghc_V15s5eZUxP0PsKFcNnTX1On7c1UQ4BwSGGW=s96-c',
  fullName: 'Chirag Bablani',
  userName: 'chiragBablani',
};
