import React, { useContext } from "react";
import { RoomTeamCard } from "../../components/roomCard/RoomTeamCard";
import { useMeQuery, useUsersQuery } from "../../generated/graphql";
import { useRoom } from "../../global-stores";
import { deleteTeam, joinTeam, leaveTeam } from "../../service/roomSocket";
import { WebSocketContext } from "../ws/WebSocketProvider";
import { RoomUserAvatarController } from "./RoomUserAvatarController";

interface RoomTeamCardControllerProps {
  teamName: string;
  canJoinTeam: boolean;
}

export const RoomTeamCardController: React.FC<RoomTeamCardControllerProps> = ({
  teamName,
  canJoinTeam,
}) => {
  const room = useRoom((state) => state.room);
  const setRoom = useRoom((state) => state.setRoom);
  const { conn } = useContext(WebSocketContext);
  const { data: meData } = useMeQuery();
  const { data: userQueryData, loading: userQueryLoading } = useUsersQuery({
    variables: { userIds: room?.teams![teamName]! },
  });
  let teamMemberCards = null;

  if (userQueryLoading) {
  } else if (!userQueryData?.users) {
  } else {
    teamMemberCards = userQueryData.users.map((user) => (
      <RoomUserAvatarController
        key={user.id}
        username={user.username}
        profilePicture={user.profilePicture}
      />
    ));
  }

  const handleJoinTeam = async () => {
    // TODO: we need to do something about any here, need to research more (this is bad)
    try {
      const res: any = await joinTeam(conn, teamName);

      if (res.data) {
        setRoom(res.data);
      }
    } catch (error: any) {
      if (error && error.error === "Already in team") {
        const leaveTeamRes: any = await leaveTeam(conn);
        if (leaveTeamRes.data) {
          const joinTeamRes: any = await joinTeam(conn, teamName);
          if (joinTeamRes.data) {
            setRoom(joinTeamRes.data);
          }
        }
      }
    }
  };

  const handleLeaveTeam = async () => {
    try {
      const res: any = await leaveTeam(conn);
      if (res.data) {
        setRoom(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTeam = async () => {
    try {
      const res: any = await deleteTeam(conn, teamName);
      if (res.data) {
        setRoom(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RoomTeamCard
      isAdmin={meData?.me?.id === room?.config.adminUserId}
      teamName={teamName}
      teamMemberCards={teamMemberCards}
      joinOrLeaveTeamBtnText={canJoinTeam ? "Join" : "Leave"}
      joinTeamOnClick={handleJoinTeam}
      leaveTeamOnClick={handleLeaveTeam}
      deleteTeamOnClick={handleDeleteTeam}
    />
  );
};
