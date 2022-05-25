import React from 'react';
import { Email } from '../../icons';

interface ProfileAboutTabProps {
  followers: number;
  following: number;
  bio?: string | null;
  email?: string;
}

export const ProfileAboutTab: React.FC<ProfileAboutTabProps> = ({
  followers,
  following,
  bio,
  email,
}) => {
  return (
    <div className="flex flex-col bg-primary-800 p-4 rounded-lg">
      <div>
        <span className="text-primary-100">
          {`${followers} `} <span className="text-primary-300">followers</span>
        </span>
        <span className="text-primary-100 ml-2">
          {`${following} `} <span className="text-primary-300">following</span>
        </span>
      </div>
      {!bio ? null : <span className="text-primary-100 mt-2">{bio}</span>}
      {!email ? null : (
        <div className="flex items-center mt-2">
          <Email className="fill-primary-300" width={18} height={18} />
          <span className="text-primary-100 ml-2">{email}</span>
        </div>
      )}
    </div>
  );
};
