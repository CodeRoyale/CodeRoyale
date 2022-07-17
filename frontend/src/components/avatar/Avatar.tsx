import React, { HTMLAttributes } from 'react';

type UserAvatarProps = HTMLAttributes<HTMLDivElement> & {
  profilePicture: string;
  width: number;
  height: number;
};

// TODO: Change alt of image to userName
// TODO: Use next/image
export const UserAvatar: React.FC<UserAvatarProps> = ({
  profilePicture,
  width,
  height,
  ...props
}) => (
  <div {...props}>
    <img
      className="rounded-full"
      src={profilePicture}
      alt="User Avatar"
      width={width}
      height={height}
    />
  </div>
);

export interface RoomUserAvatarProps {
  profilePicture: string;
  username: string;
}

export const RoomUserAvatar: React.FC<RoomUserAvatarProps> = ({
  profilePicture,
  username,
}) => (
  <div
    className="break-words p-0.5 focus:outline focus:outline-offset-2 focus:outline-focus-outline cursor-pointer" /* eslint-disable-next-line */
    tabIndex={1}
  >
    <img
      className="rounded-full m-auto"
      src={profilePicture}
      alt="Room User Avatar"
      width={60}
      height={60}
    />
    <span className="m-auto text-primary-100 text-xs mt-1.5">{username}</span>
  </div>
);
