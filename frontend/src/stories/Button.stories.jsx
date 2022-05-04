import React from 'react';
import Button from '../components/Button';

export default {
  title: 'Button',
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Main = Template.bind({});
Main.args = {
  size: 'normal',
  children: 'Create Room',
  buttonClass: 'primary',
};
