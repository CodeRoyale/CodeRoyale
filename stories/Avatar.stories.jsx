import React from 'react';
import { UserAvatar, RoomUserAvatar } from '../components/Avatar';

export default {
  title: 'Avatar',
};

const UserAvatarTemplate = (args) => <UserAvatar {...args} />;

export const UAvatar = UserAvatarTemplate.bind({});
UAvatar.args = {
  avatarImage:
    'https://lh3.googleusercontent.com/a-/AOh14Ghc_V15s5eZUxP0PsKFcNnTX1On7c1UQ4BwSGGW=s96-c',
};

const RoomUserAvatarTemplate = (args) => <RoomUserAvatar {...args} />;

export const RUAvatar = RoomUserAvatarTemplate.bind({});
RUAvatar.args = {
  avatarImage:
    'https://lh3.googleusercontent.com/a-/AOh14Ghc_V15s5eZUxP0PsKFcNnTX1On7c1UQ4BwSGGW=s96-c',
};
