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
  title: `Chirag's room`,
  currMemberCount: 7,
  maxMembers: 8,
  roomCompetitionQuestionTags: ['Trees', 'Dynamic Programming'],
  creatorUserName: 'joelmathew',
};
