import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ProfileBanner } from "../components/ProfileBanner";

export default {
  title: "Profile Banner",
  component: ProfileBanner,
} as ComponentMeta<typeof ProfileBanner>;

const Template: ComponentStory<typeof ProfileBanner> = (args) => (
  <ProfileBanner {...args} />
);

export const main = Template.bind({});
main.args = {
  profilePicture:
    "https://lh3.googleusercontent.com/a-/AOh14Ghc_V15s5eZUxP0PsKFcNnTX1On7c1UQ4BwSGGW=s96-c",
  username: "vuld0",
  name: "Chirag Bablani",
};
