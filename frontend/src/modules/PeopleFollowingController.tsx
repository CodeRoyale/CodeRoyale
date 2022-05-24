import React from 'react';
import { v4 as uuid } from 'uuid';
import { PeopleCard } from '../components/PeopleCard';
import { useMeQuery } from '../generated/graphql';

export const PeopleFollowingController: React.FC<{}> = () => {
  const { data, loading } = useMeQuery();

  const tempPeopleData = [
    {
      avatarUrl:
        'https://lh3.googleusercontent.com/a-/AOh14Ghc_V15s5eZUxP0PsKFcNnTX1On7c1UQ4BwSGGW=s96-c',
      fullName: 'Chirag Bablani',
      matchStatus: false,
      online: true,
    },
    {
      avatarUrl:
        'https://lh3.googleusercontent.com/a-/AOh14Ghc_V15s5eZUxP0PsKFcNnTX1On7c1UQ4BwSGGW=s96-c',
      fullName: 'Joel Mathew',
      matchStatus: true,
      online: true,
    },
  ];

  let body = null;

  if (loading) {
  } else if (data?.me) {
    body = (
      <>
        <h1 className="text-primary-100 font-bold text-2xl">People</h1>
        <span className="text-primary-300 text-sm mt-4">Online</span>
        <div className="py-4">
          {tempPeopleData.map(
            ({ avatarUrl, fullName, matchStatus, online }) => (
              <PeopleCard
                key={uuid()}
                avatarUrl={avatarUrl}
                fullName={fullName}
                matchStatus={matchStatus}
                online={online}
              />
            )
          )}
        </div>
      </>
    );
  }

  return <div className="flex flex-col mt-8">{body}</div>;
};