import { useRouter } from 'next/router';
import React from 'react';
import { Button } from '../../components/Button';
import { RoomSummaryCard } from '../../components/RoomSummaryCard';
import { useMeQuery, useRoomsQuery } from '../../generated/graphql';
import { CreateRoomController } from './CreateRoomController';

export const PublicRoomsController: React.FC<{}> = () => {
  const router = useRouter();
  const { data: meData, loading: meLoading } = useMeQuery();
  const {
    data: roomsData,
    loading: roomsLoading,
    fetchMore: roomsFetchMore,
    variables: roomsVariables,
  } = useRoomsQuery({
    variables: {
      isPrivate: false,
      limit: 10,
      cursor: null,
    },
    // to make loading true when fetching more rooms through pagination
    notifyOnNetworkStatusChange: true,
  });

  let body = null;

  if (roomsLoading || meLoading) {
  } else if (!roomsData?.rooms || !meData?.me) {
  } else {
    body = (
      <>
        <div className="flex justify-between items-center w-full">
          <h1 className="text-primary-100 font-bold text-2xl">Public Rooms</h1>
          {!meData?.me || meLoading ? null : <CreateRoomController />}
        </div>
        <div className="flex flex-col py-6">
          {roomsData?.rooms.rooms.length === 0 ? (
            <span className="text-primary-300 text-sm mt-4">
              We could not find any public rooms, maybe you could create one for
              others to join!
            </span>
          ) : null}
          {!roomsData && roomsLoading ? (
            <span className="text-primary-200">Loading...</span>
          ) : (
            roomsData?.rooms.rooms.map((room, index) => (
              <RoomSummaryCard
                key={index}
                title={room.title}
                currMemberCount={0}
                maxMembers={room.maxMembers}
                roomCompetitionQuestionTags={[
                  'Dynamic Programming',
                  'Trees',
                  'Stacks',
                ]}
                marginTop={index !== 0 ? 'mt-6' : null}
                creatorUserName={room.creator.username}
                onClick={() => console.log('join the room')}
                onCreatorOnClick={(event) => {
                  event.stopPropagation();
                  router.push(`/profile/${room.creator.username}`);
                }}
              />
            ))
          )}
        </div>
        {!roomsData?.rooms.hasMore ? null : (
          <div className="flex items-center justify-center pb-4">
            <Button
              buttonClass="transparent"
              size="small"
              onClick={() => {
                roomsFetchMore({
                  variables: {
                    limit: roomsVariables?.limit,
                    private: roomsVariables?.isPrivate,
                    cursor:
                      roomsData.rooms.rooms[roomsData.rooms.rooms.length - 1]
                        .createdAt,
                  },
                });
              }}
              loading={roomsLoading}
              loadingText="Loading more rooms..."
            >
              Load More
            </Button>
          </div>
        )}
      </>
    );
  }

  return <div className="w-full mt-8 px-4">{body}</div>;
};
