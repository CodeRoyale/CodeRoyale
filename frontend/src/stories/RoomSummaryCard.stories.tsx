import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { RoomSummaryCard } from '../components/RoomSummaryCard';

export default {
  title: 'Room Summary Card',
  component: RoomSummaryCard,
} as ComponentMeta<typeof RoomSummaryCard>;

const Template: ComponentStory<typeof RoomSummaryCard> = (args) => (
  <RoomSummaryCard {...args} />
);

export const Main = Template.bind({});
Main.args = {
  roomName: `Chirag's room`,
  numberOfMembersInRoom: 7,
  totalMembersAllowed: 8,
  roomCompetitionQuestionTags: ['Trees', 'Dynamic Programming'],
};
