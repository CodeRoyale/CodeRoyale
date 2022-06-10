import React from 'react';
import { v4 as uuid } from 'uuid';
import { People } from '../icons';
import { Tag } from './Tag';

interface RoomSummaryCardProps {
  roomName: string;
  numberOfMembersInRoom: number;
  totalMembersAllowed: number;
  roomCompetitionQuestionTags?: string[];
  marginTop?: string | null;
}

export const RoomSummaryCard: React.FC<RoomSummaryCardProps> = ({
  roomName,
  numberOfMembersInRoom,
  totalMembersAllowed,
  roomCompetitionQuestionTags = [],
  marginTop = null,
}) => {
  const marginStyle = {
    marginLeft: '1em',
  };

  return (
    <div
      tabIndex={1}
      className={`bg-primary-800 rounded-lg w-full cursor-pointer ${marginTop} focus:outline focus:outline-offset-2 focus:outline-focus-outline`}
    >
      <div className="flex items-center justify-between p-4">
        <span className="text-primary-100 font-medium text-lg">{roomName}</span>

        <div className="flex items-center text-primary-300">
          <People width={24} height={24} className="fill-primary-300" />
          <span className="ml-2 text-sm">{`${numberOfMembersInRoom}/${totalMembersAllowed}`}</span>
        </div>
      </div>

      <div className="flex bg-primary-700 w-full p-4 rounded-b-lg">
        {roomCompetitionQuestionTags.map((questionTag, index) => (
          <Tag
            key={uuid()}
            title={questionTag}
            style={index !== 0 ? marginStyle : (null as any)}
          />
        ))}
      </div>
    </div>
  );
};
