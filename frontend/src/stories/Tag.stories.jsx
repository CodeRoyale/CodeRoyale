import React from 'react';
import Tag from '../components/Tag';

export default {
  title: 'Tag',
  component: Tag,
};

const Template = (args) => <Tag {...args} />;

export const Main = Template.bind({});
Main.args = {
  title: 'Dynamic Programming',
};
