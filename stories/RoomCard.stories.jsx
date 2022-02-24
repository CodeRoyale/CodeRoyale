import React from 'react';
import RoomCard from '../components/RoomCard';

export default {
  title: 'Room Card',
  component: RoomCard,
};

const Template = (args) => <RoomCard {...args} />;

export const Main = Template.bind({});
Main.args = {
  title: 'Chirags competition',
  adminUserName: 'chiragbabulani',
};
