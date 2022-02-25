import React from 'react';
import RoomTeamCard from '../components/roomCard/RoomTeamCard';

export default {
  title: 'Room Team Card',
  component: RoomTeamCard,
};

const Template = (args) => <RoomTeamCard {...args} />;

export const Main = Template.bind({});
Main.args = {
  teamName: 'ChiragsGang',
};
