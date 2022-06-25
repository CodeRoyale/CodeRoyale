import React from 'react';
import { v4 as uuid } from 'uuid';
import { RoomSummaryCard } from '../../components/RoomSummaryCard';
import { useMeQuery } from '../../generated/graphql';
import { CreateRoomController } from './CreateRoomController';

export const PublicRoomsController: React.FC<{}> = () => {
  const { data, loading } = useMeQuery();

  const tempPublicRoomsData = [
    {
      roomName: "Chirag's room",
      numberOfMembersInRoom: 7,
      totalMembersAllowed: 8,
      roomCompetitionQuestionTags: ['Dynamic Programming', 'Trees'],
    },
    {
      roomName: 'KHacks Competitive Coding Contest',
      numberOfMembersInRoom: 15,
      totalMembersAllowed: 20,
      roomCompetitionQuestionTags: ['Dynamic Programming', 'Trees', 'Stacks'],
    },
    {
      roomName: 'KHacks Competitive Coding Contest',
      numberOfMembersInRoom: 15,
      totalMembersAllowed: 20,
      roomCompetitionQuestionTags: ['Dynamic Programming', 'Trees', 'Stacks'],
    },
    {
      roomName: 'KHacks Competitive Coding Contest',
      numberOfMembersInRoom: 15,
      totalMembersAllowed: 20,
      roomCompetitionQuestionTags: ['Dynamic Programming', 'Trees', 'Stacks'],
    },
    {
      roomName: 'KHacks Competitive Coding Contest',
      numberOfMembersInRoom: 15,
      totalMembersAllowed: 20,
      roomCompetitionQuestionTags: ['Dynamic Programming', 'Trees', 'Stacks'],
    },
    {
      roomName: 'KHacks Competitive Coding Contest',
      numberOfMembersInRoom: 15,
      totalMembersAllowed: 20,
      roomCompetitionQuestionTags: ['Dynamic Programming', 'Trees', 'Stacks'],
    },
    {
      roomName: 'KHacks Competitive Coding Contest',
      numberOfMembersInRoom: 15,
      totalMembersAllowed: 20,
      roomCompetitionQuestionTags: ['Dynamic Programming', 'Trees', 'Stacks'],
    },
  ];

  let body = null;

  if (loading) {
  } else if (!data?.me) {
  } else {
    body = (
      <>
        <div className="flex justify-between items-center w-full">
          <h1 className="text-primary-100 font-bold text-2xl">Public Rooms</h1>
          {!data?.me || loading ? null : <CreateRoomController />}
        </div>
        <div className="flex flex-col py-6">
          {tempPublicRoomsData.map(
            (
              {
                roomName,
                numberOfMembersInRoom,
                totalMembersAllowed,
                roomCompetitionQuestionTags,
              },
              index
            ) => (
              <RoomSummaryCard
                key={uuid()}
                title={roomName}
                currMemberCount={numberOfMembersInRoom}
                maxMembers={totalMembersAllowed}
                roomCompetitionQuestionTags={roomCompetitionQuestionTags}
                marginTop={index !== 0 ? 'mt-6' : null}
                creatorUserName="joelmathew"
              />
            )
          )}
        </div>
      </>
    );
  }

  return <div className="w-full mt-8 px-4">{body}</div>;
};
