import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import Tag from '../components/Tag';

export default {
  title: 'Tag',
  component: Tag,
} as ComponentMeta<typeof Tag>;

const Template: ComponentStory<typeof Tag> = (args) => <Tag {...args} />;

export const Main = Template.bind({});
Main.args = {
  title: 'Dynamic Programming',
};
