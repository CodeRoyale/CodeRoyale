import React from 'react';
import { RoomUserAvatar } from '../avatar/Avatar';

interface RoomTeamCardProps {
  teamName: string;
}

export const RoomTeamCard: React.FC<RoomTeamCardProps> = ({ teamName }) => (
  <div className="bg-primary-900 rounded-md">
    <div className="py-4 pl-2 pr-8">
      <h1 className="text-primary-100 font-semibold text-lg">{teamName}</h1>
      <div className="flex mt-2 space-x-5">
        <RoomUserAvatar
          avatarImage="https://lh3.googleusercontent.com/a-/AOh14Ghc_V15s5eZUxP0PsKFcNnTX1On7c1UQ4BwSGGW=s96-c"
          userName="joelmathew"
        />
        <RoomUserAvatar
          avatarImage="https://lh3.googleusercontent.com/a-/AOh14Ghc_V15s5eZUxP0PsKFcNnTX1On7c1UQ4BwSGGW=s96-c"
          userName="joelmathew"
        />
      </div>
    </div>
    <button
      type="button"
      className="bg-[#5575E7] w-full text-primary-100 px-4 py-2 rounded-b-md transition duration-200 ease-in-out hover:bg-[#7992EC] focus:outline focus:outline-offset-2 focus:outline-focus-outline"
    >
      Join
    </button>
  </div>
);
