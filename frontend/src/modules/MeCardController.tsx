import React from "react";
import { MeCard } from "../components/MeCard";
import { useMeQuery } from "../generated/graphql";

export const MeCardController: React.FC = () => {
  const { data, loading } = useMeQuery();

  let body = null;

  if (loading) {
  } else if (!data?.me) {
  } else {
    body = (
      <MeCard
        avatarUrl={data.me.profilePicture}
        username={data.me.username}
        name={data.me.name}
        bio={data.me.bio}
        followers={data.me.followers}
        following={data.me.following}
      />
    );
  }

  return <div className="mt-8">{body}</div>;
};
