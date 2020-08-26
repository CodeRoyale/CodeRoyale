import React from 'react';

// These info are to be taken from API....
import profileData from '../../utils/examples';

function TeamMemberCard({ username }) {
  return (
    <div className='team-member-card'>
      <div className='team-member-card-image-container'>
        <img
          className='team-member-card-image'
          src={profileData.imageUrl}
          alt=''
        />
      </div>
      <div className='team-member-card-username-container'>
        <span className='team-member-card-username'>{username}</span>
      </div>
    </div>
  );
}

export default TeamMemberCard;
