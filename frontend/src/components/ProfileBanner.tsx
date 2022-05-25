import React from 'react';
import { UserAvatar } from './avatar/Avatar';
import { Button } from './Button';

interface ProfileBannerProps {
  profilePicture: string;
  name: string;
  username: string;
}

export const ProfileBanner: React.FC<ProfileBannerProps> = ({
  profilePicture,
  name,
  username,
}) => {
  return (
    <div className="bg-primary-800 p-6 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex">
          <UserAvatar
            className="-mt-14"
            profilePicture={profilePicture}
            width={100}
            height={100}
          />
          <div className="flex flex-col ml-6">
            <span className="text-sm text-primary-300">{`@${username}`}</span>
            <span className="text-lg text-primary-100 font-bold">{name}</span>
          </div>
        </div>
        <Button buttonClass="primary" size="small">
          Follow
        </Button>
      </div>
    </div>
  );
};
