import React from "react";
import { VetoUserCard } from "../../components/VetoUserCard";
import { useUserFromIdQuery } from "../../generated/graphql";
import { useRoom } from "../../global-stores";

export const VetoUserCardController: React.FC<{
  userId: number;
}> = ({ userId }) => {
  const room = useRoom((state) => state.room);
  const { data, loading } = useUserFromIdQuery({
    variables: { userId },
  });

  if (loading && !data) {
    return null;
  }

  return (
    <VetoUserCard
      name={data?.userFromId.user?.name!}
      teamName={room?.state.users[userId].team!}
      profilePicture={data?.userFromId.user?.profilePicture!}
    />
  );
};
