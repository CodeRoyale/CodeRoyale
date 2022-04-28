import React from 'react';
import propTypes from 'prop-types';
import { RoomUserAvatar } from '../avatar/Avatar';
import Button from '../Button';
import RoomCardHeader from './RoomCardHeader';
import RoomCardFooter from './RoomCardFooter';
import RoomTeamCard from './RoomTeamCard';

const RoomCard = ({ title, admin, adminUserName }) => (
  <div className='flex flex-col bg-primary-800 rounded-md w-screen'>
    <RoomCardHeader title={title} adminUserName={adminUserName} />
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
        {admin ? (
          <Button buttonClass='primary' size='normal'>
            New Team
          </Button>
        ) : null}
      </div>
      <div className='flex space-x-4 pt-2 pb-4 px-4'>
        <RoomTeamCard teamName='Chiragrules' />
        <RoomTeamCard teamName='Chiragrules' />
      </div>
    </div>

    <RoomCardFooter admin={admin} />
  </div>
);

export default RoomCard;

RoomCard.propTypes = {
  title: propTypes.string.isRequired,
  admin: propTypes.bool.isRequired,
  adminUserName: propTypes.string.isRequired,
};
