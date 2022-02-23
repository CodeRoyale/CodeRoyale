import React from 'react';
import UserAvatarController from '../avatar/UserAvatarController';

const RightHeader = () => (
  <div className='flex justify-end py-6'>
    <UserAvatarController />
  </div>
);

export default RightHeader;
