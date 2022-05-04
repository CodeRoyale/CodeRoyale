import React from 'react';
import propTypes from 'prop-types';

// TODO: Change alt of image to userName
const UserAvatar = ({ avatarImage, ...props }) => (
  <div {...props}>
    <img
      className='rounded-full cursor-pointer'
      src={avatarImage}
      alt='User Avatar'
      width={45}
      height={45}
    />
  </div>
);

const RoomUserAvatar = ({ avatarImage, userName }) => (
  <div
    className='flex flex-col items-center p-0.5 focus:outline focus:outline-offset-2 focus:outline-focus-outline cursor-pointer' /* eslint-disable-next-line */
    tabIndex='1'
  >
    <img
      className='rounded-full'
      src={avatarImage}
      alt='Room User Avatar'
      width={60}
      height={60}
    />
    <span className='text-primary-100 text-xs mt-1.5'>{userName}</span>
  </div>
);

export { UserAvatar, RoomUserAvatar };

UserAvatar.propTypes = {
  avatarImage: propTypes.string.isRequired,
};

RoomUserAvatar.propTypes = {
  avatarImage: propTypes.string.isRequired,
  userName: propTypes.string.isRequired,
};
