import React from 'react';
import { RoomUserAvatar } from '../avatar/Avatar';
import { Button } from '../Button';
import { RoomCardHeader } from './RoomCardHeader';
import { RoomCardFooter } from './RoomCardFooter';
import { RoomTeamCard } from './RoomTeamCard';

interface RoomCardProps {
  title: string;
  admin: boolean;
  adminUserName: string;
}

export const RoomCard: React.FC<RoomCardProps> = ({
  title,
  admin,
  adminUserName,
}) => (
  <div
    className="top-0 left-0 w-full relative flex flex-col bg-primary-800 rounded-md mt-8 border-b-[80px] border-primary-900"
    style={{ height: 'calc(100vh - 100px)' }}
  >
    <RoomCardHeader title={title} adminUserName={adminUserName} />
    <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-primary-700">
      <div className="grid grid-cols-7 gap-4 items-start p-4">
        <RoomUserAvatar
          profilePicture="https://lh3.googleusercontent.com/a-/AOh14Ghc_V15s5eZUxP0PsKFcNnTX1On7c1UQ4BwSGGW=s96-c"
          username="joelmathew"
        />
        <RoomUserAvatar
          profilePicture="https://lh3.googleusercontent.com/a-/AOh14Ghc_V15s5eZUxP0PsKFcNnTX1On7c1UQ4BwSGGW=s96-c"
          username="joelmathew"
        />
        <RoomUserAvatar
          profilePicture="https://lh3.googleusercontent.com/a-/AOh14Ghc_V15s5eZUxP0PsKFcNnTX1On7c1UQ4BwSGGW=s96-c"
          username="joelmathew"
        />
        <RoomUserAvatar
          profilePicture="https://lh3.googleusercontent.com/a-/AOh14Ghc_V15s5eZUxP0PsKFcNnTX1On7c1UQ4BwSGGW=s96-c"
          username="joelmathew"
        />
        <RoomUserAvatar
          profilePicture="https://lh3.googleusercontent.com/a-/AOh14Ghc_V15s5eZUxP0PsKFcNnTX1On7c1UQ4BwSGGW=s96-c"
          username="joelmathew"
        />
        <RoomUserAvatar
          profilePicture="https://lh3.googleusercontent.com/a-/AOh14Ghc_V15s5eZUxP0PsKFcNnTX1On7c1UQ4BwSGGW=s96-c"
          username="joelmathew"
        />
        <RoomUserAvatar
          profilePicture="https://lh3.googleusercontent.com/a-/AOh14Ghc_V15s5eZUxP0PsKFcNnTX1On7c1UQ4BwSGGW=s96-c"
          username="joelmathew"
        />
        <RoomUserAvatar
          profilePicture="https://lh3.googleusercontent.com/a-/AOh14Ghc_V15s5eZUxP0PsKFcNnTX1On7c1UQ4BwSGGW=s96-c"
          username="joelmathew"
        />
      </div>

      <div>
        <div className="flex items-center justify-between p-4">
          <h1 className="text-lg text-primary-100 font-medium">Teams</h1>
          {admin ? null : (
            <Button buttonClass="primary" size="normal">
              New Team
            </Button>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 pt-2 pb-4 px-4">
          <RoomTeamCard teamName="Chiragrules" />
          <RoomTeamCard teamName="Chiragrules" />
          <RoomTeamCard teamName="Chiragrules" />
          <RoomTeamCard teamName="Chiragrules" />
        </div>
      </div>
    </div>

    <RoomCardFooter admin={admin} />
  </div>
);
