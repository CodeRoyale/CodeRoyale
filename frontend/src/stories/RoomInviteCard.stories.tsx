import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { RoomInviteCard } from "../components/RoomInviteCard";

export default {
  title: "Room Invite Card",
  component: RoomInviteCard,
} as ComponentMeta<typeof RoomInviteCard>;

const Template: ComponentStory<typeof RoomInviteCard> = (args) => (
  <RoomInviteCard {...args} />
);

export const Main = Template.bind({});
Main.args = {
  profilePicture:
    "https://lh3.googleusercontent.com/a-/AOh14Ghc_V15s5eZUxP0PsKFcNnTX1On7c1UQ4BwSGGW=s96-c",
  name: "Chirag Bablani",
  username: "chiragBablani",
};
