import React from 'react';
import propTypes from 'prop-types';

const ProfileCard = ({
  avatarUrl,
  userName,
  firstName,
  lastName,
  about,
  followers,
  following,
}) => (
  <div className='bg-primary-800 rounded-md'>
    <img className='w-full h-60 rounded-t-md' src={avatarUrl} alt={userName} />

    <div className='p-6'>
      <div className='flex flex-col'>
        <span className='text-primary-300 mt-px text-sm'>{`@${userName}`}</span>
        <h1 className='text-primary-100 font-bold text-lg'>{`${firstName} ${lastName}`}</h1>
      </div>

      <div className='flex text-sm mt-2'>
        <span className='text-primary-100'>
          {`${followers} `}
          <span className='text-primary-300'>Followers</span>
        </span>
        <span className='text-primary-100 ml-2'>
          {`${following} `} <span className='text-primary-300'>Following</span>
        </span>
      </div>

      <p className='text-primary-300 mt-2 break-words text-left'>{about}</p>
    </div>
  </div>
);

export default ProfileCard;

ProfileCard.propTypes = {
  avatarUrl: propTypes.string.isRequired,
  userName: propTypes.string.isRequired,
  firstName: propTypes.string.isRequired,
  lastName: propTypes.string.isRequired,
  about: propTypes.string,
  followers: propTypes.number.isRequired,
  following: propTypes.number.isRequired,
};

ProfileCard.defaultProps = {
  about: '',
};
