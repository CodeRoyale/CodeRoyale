import React from 'react';
import propTypes from 'prop-types';
import { IoIosPeople } from 'react-icons/io';
import Tag from './Tag';

const RoomSummaryCard = ({
  roomName,
  numberOfMembersInRoom,
  totalMembersAllowed,
  roomCompetitionQuestionTags,
}) => {
  const marginStyle = {
    'margin-left': '1em',
  };

  return (
    <div className='bg-primary-800 rounded-lg w-full cursor-pointer'>
      <div className='flex items-center justify-between p-4'>
        <span className='text-primary-100 font-medium text-lg'>{roomName}</span>

        <div className='flex items-center text-primary-300'>
          <IoIosPeople size={22} />
          <span className='ml-1 text-sm'>{`${numberOfMembersInRoom}/${totalMembersAllowed}`}</span>
        </div>
      </div>

      <div className='flex bg-primary-700 w-full p-4 rounded-b-lg'>
        {roomCompetitionQuestionTags.map((questionTag, index) => (
          <Tag title={questionTag} style={index !== 0 ? marginStyle : null} />
        ))}
      </div>
    </div>
  );
};

export default RoomSummaryCard;

RoomSummaryCard.propTypes = {
  roomName: propTypes.string.isRequired,
  numberOfMembersInRoom: propTypes.number.isRequired,
  totalMembersAllowed: propTypes.number.isRequired,
  /* eslint-disable-next-line react/forbid-prop-types */
  roomCompetitionQuestionTags: propTypes.array,
};

RoomSummaryCard.defaultProps = {
  roomCompetitionQuestionTags: [],
};
