import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MeCard } from "../components/MeCard";

export default {
  title: "Me Card",
  component: MeCard,
} as ComponentMeta<typeof MeCard>;

const Template: ComponentStory<typeof MeCard> = (args) => <MeCard {...args} />;

export const Main = Template.bind({});
Main.args = {
  avatarUrl:
    "https://lh3.googleusercontent.com/a-/AOh14Ghc_V15s5eZUxP0PsKFcNnTX1On7c1UQ4BwSGGW=s96-c",
  username: "chiragbablani",
  name: "Chirag Bablani",
  bio: "The best coder/hacker in the World",
  followers: 1204,
  following: 10,
};
