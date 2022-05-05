import React, { HTMLAttributes } from 'react';

type UserAvatarProps = HTMLAttributes<HTMLDivElement> & {
  avatarImage: string;
};

// TODO: Change alt of image to userName
// TODO: Use next/image
const UserAvatar: React.FC<UserAvatarProps> = ({ avatarImage, ...props }) => (
  <div {...props}>
    <img
      className="rounded-full cursor-pointer"
      src={avatarImage}
      alt="User Avatar"
      width={45}
      height={45}
    />
  </div>
);

interface RoomUserAvatarProps {
  avatarImage: string;
  userName: string;
}

const RoomUserAvatar: React.FC<RoomUserAvatarProps> = ({
  avatarImage,
  userName,
}) => (
  <div
    className="flex flex-col items-center p-0.5 focus:outline focus:outline-offset-2 focus:outline-focus-outline cursor-pointer" /* eslint-disable-next-line */
    tabIndex={1}
  >
    <img
      className="rounded-full"
      src={avatarImage}
      alt="Room User Avatar"
      width={60}
      height={60}
    />
    <span className="text-primary-100 text-xs mt-1.5">{userName}</span>
  </div>
);

export { UserAvatar, RoomUserAvatar };
