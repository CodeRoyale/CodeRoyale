import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ProfileTabs } from "../components/profileTabs/ProfileTabs";

export default {
  title: "Profile Tabs",
  component: ProfileTabs,
} as ComponentMeta<typeof ProfileTabs>;

const Template: ComponentStory<typeof ProfileTabs> = (args) => (
  <ProfileTabs {...args} />
);

export const main = Template.bind({});
main.args = {};
