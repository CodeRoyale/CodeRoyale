import React from 'react';
import { v4 as uuid } from 'uuid';
import { RoomInviteCard } from '../components/RoomInviteCard';
import { useMeQuery } from '../generated/graphql';

export const RoomInvitesController = () => {
  const { data, loading } = useMeQuery();

  const tempRoomInvitesData = [
    {
      avatarUrl:
        'https://lh3.googleusercontent.com/a-/AOh14Ghc_V15s5eZUxP0PsKFcNnTX1On7c1UQ4BwSGGW=s96-c',
      fullName: 'Joel Mathew',
      userName: 'Rec0iL99',
    },
  ];

  let body = null;

  if (loading) {
  } else if (!data?.me) {
  } else {
    body = (
      <>
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
      </>
    );
  }

  return <div className="mt-8">{body}</div>;
};
