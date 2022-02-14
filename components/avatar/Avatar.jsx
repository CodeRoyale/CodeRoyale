import React from 'react';
import propTypes from 'prop-types';

const UserAvatar = ({ avatarImage, ...props }) => (
  <div {...props}>
    <img
      className='rounded-full cursor-pointer'
      src={avatarImage}
      alt='User Avatar'
      width={55}
      height={55}
    />
  </div>
);

const RoomUserAvatar = ({ avatarImage }) => (
  <img
    className='rounded-full cursor-pointer'
    src={avatarImage}
    alt='Room User Avatar'
    width={60}
    height={60}
  />
);

export { UserAvatar, RoomUserAvatar };

UserAvatar.propTypes = {
  avatarImage: propTypes.string.isRequired,
};

RoomUserAvatar.propTypes = {
  avatarImage: propTypes.string.isRequired,
};
