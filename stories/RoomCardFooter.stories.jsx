import React from 'react';
import RoomCardFooter from '../components/RoomCardFooter';

export default {
  title: 'Room Card Footer',
  component: RoomCardFooter,
};

const Template = (args) => <RoomCardFooter {...args} />;

export const Main = Template.bind({});
Main.args = {
  admin: true,
};
