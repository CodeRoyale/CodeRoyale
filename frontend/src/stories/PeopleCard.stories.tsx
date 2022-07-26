import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { PeopleCard } from "../components/peopleCard/PeopleCard";

export default {
  title: "People Card",
  component: PeopleCard,
} as ComponentMeta<typeof PeopleCard>;

const Template: ComponentStory<typeof PeopleCard> = (args) => (
  <PeopleCard {...args} />
);

export const Main = Template.bind({});
Main.args = {
  profilePicture:
    "https://lh3.googleusercontent.com/a-/AOh14Ghc_V15s5eZUxP0PsKFcNnTX1On7c1UQ4BwSGGW=s96-c",
  name: "Chirag Bablani",
  matchStatus: false,
  online: true,
};
