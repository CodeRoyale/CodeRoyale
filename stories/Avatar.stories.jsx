import React from 'react';
import {
  UserAvatar as UserAvatarComponent,
  RoomUserAvatar as RoomUserAvatarComponent,
} from '../components/avatar/Avatar';

export default {
  title: 'Avatar',
};

const UserAvatarTemplate = (args) => <UserAvatarComponent {...args} />;

export const UserAvatar = UserAvatarTemplate.bind({});
UserAvatar.args = {
  avatarImage:
    'https://lh3.googleusercontent.com/a-/AOh14Ghc_V15s5eZUxP0PsKFcNnTX1On7c1UQ4BwSGGW=s96-c',
};

const RoomUserAvatarTemplate = (args) => <RoomUserAvatarComponent {...args} />;

export const RoomUserAvatar = RoomUserAvatarTemplate.bind({});
RoomUserAvatar.args = {
  avatarImage:
    'https://lh3.googleusercontent.com/a-/AOh14Ghc_V15s5eZUxP0PsKFcNnTX1On7c1UQ4BwSGGW=s96-c',
};
