import React from 'react';
import RoomSummaryCard from '../components/RoomSummaryCard';

export default {
  title: 'Room Summary Card',
  component: RoomSummaryCard,
};

const Template = (args) => <RoomSummaryCard {...args} />;

export const Main = Template.bind({});
Main.args = {
  roomName: `Chirag's room`,
  numberOfMembersInRoom: 7,
  totalMembersAllowed: 8,
  roomCompetitionQuestionTags: ['Trees', 'Dynamic Programming'],
};
