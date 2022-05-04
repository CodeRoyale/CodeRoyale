import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import RoomTeamCard from '../components/roomCard/RoomTeamCard';

export default {
  title: 'Room Team Card',
  component: RoomTeamCard,
} as ComponentMeta<typeof RoomTeamCard>;

const Template: ComponentStory<typeof RoomTeamCard> = (args) => (
  <RoomTeamCard {...args} />
);

export const Main = Template.bind({});
Main.args = {
  teamName: 'ChiragsGang',
};
