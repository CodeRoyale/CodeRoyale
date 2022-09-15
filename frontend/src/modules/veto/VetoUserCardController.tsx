import React from "react";
import { VetoUserCard } from "../../components/VetoUserCard";
import { useUserFromIdQuery } from "../../generated/graphql";

export const VetoUserCardController: React.FC<{
  userId: number;
  teamName: string;
}> = ({ userId, teamName }) => {
  const { data, loading } = useUserFromIdQuery({
    variables: { userId },
  });

  if (loading && !data) {
    return null;
  }

  return (
    <VetoUserCard
      name={data?.userFromId.user?.name!}
      teamName={teamName}
      profilePicture={data?.userFromId.user?.profilePicture!}
    />
  );
};
