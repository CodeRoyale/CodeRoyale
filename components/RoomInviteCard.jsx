import React from 'react';
import propTypes from 'prop-types';
import Button from './Button';

const RoomInviteCard = ({ avatarUrl, fullName, userName }) => (
  <div className='bg-primary-800 rounded-md p-6'>
    <div className='flex'>
      <img className='rounded-full w-20 h-20' alt={userName} src={avatarUrl} />

      <div className='ml-4'>
        <span className='text-primary-100 font-medium text-lg'>{fullName}</span>

        <p className='text-primary-300 text-xs'>{`${fullName} invited you to a match`}</p>

        <div className='flex justify-between mt-3'>
          <Button buttonClass='secondary' size='normal'>
            Accept
          </Button>

          <Button buttonClass='transparent' size='normal'>
            Decline
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export default RoomInviteCard;

RoomInviteCard.propTypes = {
  avatarUrl: propTypes.string.isRequired,
  fullName: propTypes.string.isRequired,
  userName: propTypes.string.isRequired,
};
