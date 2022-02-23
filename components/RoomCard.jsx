import React from 'react';
import propTypes from 'prop-types';
import { RoomUserAvatar } from './avatar/Avatar';
import Button from './Button';

const RoomCard = ({ title }) => (
  <div className='flex flex-col bg-primary-800 rounded-md w-screen'>
    <div className='border-b border-primary-600 p-4'>
      <h1 className='text-lg text-primary-100 font-semibold'>{title}</h1>
    </div>

    <div className='flex p-4 space-x-5'>
      <RoomUserAvatar
        avatarImage='https://lh3.googleusercontent.com/a-/AOh14Ghc_V15s5eZUxP0PsKFcNnTX1On7c1UQ4BwSGGW=s96-c'
        userName='joelmathew'
      />
      <RoomUserAvatar
        avatarImage='https://lh3.googleusercontent.com/a-/AOh14Ghc_V15s5eZUxP0PsKFcNnTX1On7c1UQ4BwSGGW=s96-c'
        userName='joelmathew'
      />
    </div>

    <div>
      <div className='flex items-center justify-between p-4'>
        <h1 className='text-lg text-primary-100 font-medium'>Teams</h1>
        <Button buttonClass='primary' size='normal'>
          New Team
        </Button>
      </div>
    </div>

    <div className='position bg-primary-700 p-4 rounded-b-md'>Buttons</div>
  </div>
);

export default RoomCard;

RoomCard.propTypes = {
  title: propTypes.string.isRequired,
};
