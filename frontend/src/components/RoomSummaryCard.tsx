import React from 'react';
import { v4 as uuid } from 'uuid';
import { People } from '../icons';
import { Tag } from './Tag';

interface RoomSummaryCardProps {
  title: string;
  currMemberCount: number;
  maxMembers: number;
  roomCompetitionQuestionTags?: string[];
  marginTop?: string | null;
  creatorUserName: string;
}

export const RoomSummaryCard: React.FC<RoomSummaryCardProps> = ({
  title,
  currMemberCount,
  maxMembers,
  roomCompetitionQuestionTags = [],
  marginTop = null,
  creatorUserName,
}) => {
  const marginStyle = {
    marginLeft: '1em',
  };

  return (
    <div
      tabIndex={1}
      className={`bg-primary-800 rounded-lg w-full cursor-pointer ${marginTop} focus:outline focus:outline-offset-2 focus:outline-focus-outline`}
    >
      <div
        className="pt-2 pl-4"
        onClick={(event) => {
          // for stopping the parent div onClick from working
          event.stopPropagation();
          console.log('creator');
        }}
      >
        <span className="text-primary-300">{creatorUserName}</span>
      </div>
      <div className="flex items-center justify-between px-4 pb-4 pt-2">
        <span className="text-primary-100 font-medium text-lg">{title}</span>

        <div className="flex items-center text-primary-300">
          <People width={24} height={24} className="fill-primary-300" />
          <span className="ml-2 text-sm">{`${currMemberCount}/${maxMembers}`}</span>
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
