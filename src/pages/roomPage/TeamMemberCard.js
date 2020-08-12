import React from 'react';

function TeamMemberCard({ username, imageUrl }) {
  const onClickLeaveButton = () => {
    //TODO: Leave Team....
  };

  return (
    <div className='team-member-card'>
      <div className='team-member-card-image-container'>
        <img className='team-member-card-image' src={imageUrl} alt='' />
      </div>
      <div className='team-member-card-username-container'>
        <span className='team-member-card-username'>{username}</span>
      </div>
      <div className='team-member-card-leave-button-container'>
        <div className='team-member-card-leave-button-container-row'>
          <img
            src='/images/close_button_black.svg'
            className='team-member-card-leave-button'
            alt='no'
            onClick={onClickLeaveButton()}
          />
        </div>
      </div>
    </div>
  );
}

export default TeamMemberCard;
