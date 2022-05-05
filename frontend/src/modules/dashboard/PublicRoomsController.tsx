import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import RoomSummaryCard from '../../components/RoomSummaryCard';

const PublicRoomsController: React.FC<{}> = () => {
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

  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="w-full mt-8 px-4">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-primary-100 font-bold text-2xl">Public Rooms</h1>
        <Button
          buttonClass="primary"
          size="normal"
          onClick={() => setModalIsOpen(true)}
        >
          Create Room
        </Button>
        <Modal modalIsOpen={modalIsOpen}>
          <h2>Hello World</h2>
        </Modal>
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
              roomName={roomName}
              numberOfMembersInRoom={numberOfMembersInRoom}
              totalMembersAllowed={totalMembersAllowed}
              roomCompetitionQuestionTags={roomCompetitionQuestionTags}
              marginTop={index !== 0 ? 'mt-6' : null}
            />
          )
        )}
      </div>
    </div>
  );
};

export default PublicRoomsController;
