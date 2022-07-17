import React from 'react';
import { Button } from '../../components/Button';
import { RoomCardFooter } from '../../components/roomCard/RoomCardFooter';
import { RoomCardHeader } from '../../components/roomCard/RoomCardHeader';
import { RoomTeamCard } from '../../components/roomCard/RoomTeamCard';
import { useMeQuery, useUsersQuery } from '../../generated/graphql';
import { useRoom } from '../../global-stores';
import { RoomUserAvatarController } from './RoomUserAvatarController';

interface RoomCardControllerProps {
  title: string;
  admin: boolean;
  adminUserName: string;
}

export const RoomCardController: React.FC<RoomCardControllerProps> = ({
  title,
  admin,
  adminUserName,
}) => {
  let benchRoomUserAvatars = null;
  // let teamRoomUserAvatars = null;

  const { data: meData } = useMeQuery();

  const room = useRoom((state) => state.room);
  const { data: usersData, loading: usersLoading } = useUsersQuery({
    variables: { userIds: room?.state.bench! },
  });

  if (usersLoading) {
  } else if (!usersData?.users) {
  } else {
    benchRoomUserAvatars = usersData?.users.map((user) => (
      <RoomUserAvatarController
        key={user.id}
        username={user.username}
        profilePicture={user.profilePicture}
      />
    ));
  }

  return (
    <div
      className="top-0 left-0 w-full relative flex flex-col bg-primary-800 rounded-md mt-8 border-b-[80px] border-primary-900"
      style={{ height: 'calc(100vh - 100px)' }}
    >
      <RoomCardHeader title={title} adminUserName={adminUserName} />
      <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-primary-700">
        <div
          className={`grid grid-cols-7 gap-4 items-start ${
            benchRoomUserAvatars ? 'p-4' : ''
          }`}
        >
          {benchRoomUserAvatars}
        </div>

        <div>
          <div className="flex items-center justify-between p-4">
            <h1 className="text-lg text-primary-100 font-medium">Teams</h1>
            {meData?.me?.id !== room?.config.adminUserId ? null : (
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
};
