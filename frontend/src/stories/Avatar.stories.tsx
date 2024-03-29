import React from "react";
import { ComponentStory } from "@storybook/react";
import {
  UserAvatar as UserAvatarComponent,
  RoomUserAvatar as RoomUserAvatarComponent,
} from "../components/avatar/Avatar";

export default {
  title: "Avatar",
};

const UserAvatarTemplate: ComponentStory<typeof UserAvatarComponent> = (
  args
) => <UserAvatarComponent {...args} />;

export const UserAvatar = UserAvatarTemplate.bind({});
UserAvatar.args = {
  width: 45,
  height: 45,
  profilePicture:
    "https://lh3.googleusercontent.com/a-/AOh14Ghc_V15s5eZUxP0PsKFcNnTX1On7c1UQ4BwSGGW=s96-c",
};

const RoomUserAvatarTemplate: ComponentStory<typeof RoomUserAvatarComponent> = (
  args
) => <RoomUserAvatarComponent {...args} />;

export const RoomUserAvatar = RoomUserAvatarTemplate.bind({});
RoomUserAvatar.args = {
  profilePicture:
    "https://lh3.googleusercontent.com/a-/AOh14Ghc_V15s5eZUxP0PsKFcNnTX1On7c1UQ4BwSGGW=s96-c",
  username: "chiragbabulani",
};
