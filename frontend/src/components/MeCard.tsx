import React from 'react';

interface MeCardProps {
  avatarUrl: string;
  username: string;
  name: string;
  bio: string | null | undefined;
  followers: number;
  following: number;
}

export const MeCard: React.FC<MeCardProps> = ({
  avatarUrl,
  username,
  name,
  bio,
  followers,
  following,
}) => (
  <div className="bg-primary-800 rounded-md">
    <img className="w-full h-60 rounded-t-md" src={avatarUrl} alt={username} />

    <div className="p-6">
      <div className="flex flex-col">
        <span className="text-primary-300 mt-px text-sm">{`@${username}`}</span>
        <h1 className="text-primary-100 font-bold text-lg">{name}</h1>
      </div>

      <div className="flex text-sm mt-2">
        <span className="text-primary-100">
          {`${followers} `} <span className="text-primary-300">followers</span>
        </span>
        <span className="text-primary-100 ml-2">
          {`${following} `} <span className="text-primary-300">following</span>
        </span>
      </div>

      {!bio ? null : (
        <p className="text-primary-300 mt-2 break-words text-left">{bio}</p>
      )}
    </div>
  </div>
);
