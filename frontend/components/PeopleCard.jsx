import React from 'react';
import propTypes from 'prop-types';

const PeopleCard = ({ avatarUrl, fullName, matchStatus, online }) => (
  <div
    className='flex items-center cursor-pointer -ml-3 px-3 py-3 transition duration-200 ease-in-out hover:bg-primary-800 focus:outline focus:outline-offset-2 focus:outline-focus-outline rounded-md'
    /* eslint-disable-next-line */
    tabIndex='1'
  >
    <img
      className='rounded-full'
      alt={fullName}
      src={avatarUrl}
      width={45}
      height={45}
    />
    <div className='flex flex-col ml-4 justify-center'>
      <span className='text-primary-100 text-base font-medium'>{fullName}</span>
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
