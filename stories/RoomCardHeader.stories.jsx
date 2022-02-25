import React from 'react';
import RoomCardHeader from '../components/roomCard/RoomCardHeader';

export default {
  title: 'Room Card Header',
  component: RoomCardHeader,
};

const Template = (args) => <RoomCardHeader {...args} />;

export const Main = Template.bind({});
Main.args = {
  title: 'Chirags Competition',
  adminUserName: 'chiragbabulani',
};
