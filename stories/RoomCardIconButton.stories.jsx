import React from 'react';
import RoomCardIconButton from '../components/RoomCardIconButton';

export default {
  title: 'Room Card Icon Button',
  component: RoomCardIconButton,
};

const Template = (args) => <RoomCardIconButton {...args} />;

export const Main = Template.bind({});
Main.args = { icon: 'settings' };
