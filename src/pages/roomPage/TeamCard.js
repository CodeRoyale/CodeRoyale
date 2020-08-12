import React from 'react';
import TeamMemberCard from './TeamMemberCard';
import profileData from '../../utils/examples';

function TeamCard() {
  const onClickCloseTeam = () => {
    //TODO: Delete team...
  };

  return (
    <div className='team-card'>
      <div className='team-card-team-name-container'>
        <div className='team-card-team-name-text'>TEAM_NAME</div>
        <div className='team-card-team-name-close-button-container'>
          <div className='team-card-team-name-close-button-container-row'>
            <img
              src='/images/close_button_black.svg'
              alt=''
              className='team-card-team-name-close-button'
              onClick={onClickCloseTeam}
            />
          </div>
        </div>
      </div>
      <div>
        <div className='team-card-container-row'>
          <div className='team-card-container'>
            <TeamMemberCard
              username={profileData.username}
              imageUrl={profileData.imageUrl}
            />
            <TeamMemberCard
              username={profileData.username}
              imageUrl={profileData.imageUrl}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamCard;
