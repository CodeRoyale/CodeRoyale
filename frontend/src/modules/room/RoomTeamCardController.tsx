import React from "react";
import { RoomTeamCard } from "../../components/roomCard/RoomTeamCard";
import { useUsersQuery } from "../../generated/graphql";
import { useRoom } from "../../global-stores";
import { RoomUserAvatarController } from "./RoomUserAvatarController";

interface RoomTeamCardControllerProps {
  teamName: string;
}

export const RoomTeamCardController: React.FC<RoomTeamCardControllerProps> = ({
  teamName,
}) => {
  const room = useRoom((state) => state.room);
  const { data, loading } = useUsersQuery({
    variables: { userIds: room?.teams![teamName]! },
  });
  let teamMemberCards = null;

  if (loading) {
  } else if (!data?.users) {
  } else {
    teamMemberCards = data.users.map((user) => (
      <RoomUserAvatarController
        key={user.id}
        username={user.username}
        profilePicture={user.profilePicture}
      />
    ));
  }

  return <RoomTeamCard teamName={teamName} teamMemberCards={teamMemberCards} />;
};
