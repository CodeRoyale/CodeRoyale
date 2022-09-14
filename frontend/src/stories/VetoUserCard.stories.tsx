import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { VetoUserCard } from "../components/VetoUserCard";

export default {
  title: "Veto User Card",
  component: VetoUserCard,
} as ComponentMeta<typeof VetoUserCard>;

const Template: ComponentStory<typeof VetoUserCard> = (args) => (
  <VetoUserCard {...args} />
);

export const Main = Template.bind({});
Main.args = {
  profilePicture:
    "https://lh3.googleusercontent.com/a-/AOh14Ghc_V15s5eZUxP0PsKFcNnTX1On7c1UQ4BwSGGW=s96-c",
  name: "Joel Mathew",
  teamName: "team1",
};
