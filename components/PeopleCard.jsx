import React from 'react';
import propTypes from 'prop-types';

const PeopleCard = ({ avatarUrl, fullName, matchStatus, online }) => (
  <div className='flex items-center cursor-pointer py-1.5 px-4'>
    <img
      className='rounded-full'
      alt={fullName}
      src={avatarUrl}
      width={55}
      height={55}
    />
    <div className='flex flex-col ml-4 justify-center'>
      <span className='text-primary-100 text-md font-medium'>{fullName}</span>
      {/* eslint-disable-next-line no-nested-ternary */}
      {online ? (
        matchStatus ? (
          <span className='text-primary-300 text-sm'>In a Match</span>
        ) : (
          <span className='text-primary-300 text-sm'>Available</span>
        )
      ) : null}
    </div>
  </div>
);

export default PeopleCard;

PeopleCard.propTypes = {
  avatarUrl: propTypes.string.isRequired,
  fullName: propTypes.string.isRequired,
  matchStatus: propTypes.bool,
  online: propTypes.bool.isRequired,
};

PeopleCard.defaultProps = {
  matchStatus: false,
};
