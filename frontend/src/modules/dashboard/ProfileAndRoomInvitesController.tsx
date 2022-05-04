import React from 'react';
import ProfileCard from '../../components/ProfileCard';
import RoomInviteCard from '../../components/RoomInviteCard';
import { v4 as uuid } from 'uuid';

const ProfileAndRoomInvitesController: React.FC<{}> = () => {
  const tempRoomInvitesData = [
    {
      avatarUrl:
        'https://lh3.googleusercontent.com/a-/AOh14Ghc_V15s5eZUxP0PsKFcNnTX1On7c1UQ4BwSGGW=s96-c',
      fullName: 'Joel Mathew',
      userName: 'Rec0iL99',
    },
  ];

  return (
    <div className="flex flex-col justify-end mt-8">
      <ProfileCard
        avatarUrl="https://lh3.googleusercontent.com/a-/AOh14Ghc_V15s5eZUxP0PsKFcNnTX1On7c1UQ4BwSGGW=s96-c"
        userName="ciragGeek"
        firstName="Chirag"
        lastName="Bablani"
        about="Best Coder/Hacker in the World"
        followers={2434}
        following={100}
      />
      <div className="mt-8">
        <h1 className="text-primary-100 font-semibold text-xl">Room Invites</h1>
        <div className="mt-4">
          {tempRoomInvitesData.map(
            ({ avatarUrl, fullName, userName }, index) => (
              <RoomInviteCard
                key={uuid()}
                avatarUrl={avatarUrl}
                fullName={fullName}
                userName={userName}
                marginTop={index !== 0 ? 'mt-6' : null}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileAndRoomInvitesController;
