import React from 'react';
import { ProfileCard } from '../components/ProfileCard';
import { useMeQuery } from '../generated/graphql';

export const ProfileCardController: React.FC = () => {
  const { data, loading } = useMeQuery();

  let body = null;

  if (loading) {
  } else if (!data?.me) {
  } else {
    body = (
      <ProfileCard
        avatarUrl={data.me.profilePicture}
        username={data.me.username}
        name={data.me.name}
        bio={data.me?.bio}
        followers={2434}
        following={100}
      />
    );
  }

  return <div className="mt-8">{body}</div>;
};
