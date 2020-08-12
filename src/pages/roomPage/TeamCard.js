import React from 'react';
import TeamMemberCard from './TeamMemberCard';

function TeamCard({ team_name, team }) {
  const onClickCloseTeam = () => {
    //TODO: Delete team...
  };

  // Setting team members cards...
  const team_members = team.map((username) => (
    <TeamMemberCard key={username} username={username} />
  ));
  return (
    <div className='team-card'>
      <div className='team-card-team-name-container'>
        <div className='team-card-team-name-text'>{team_name}</div>
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
        <div className='team-card-container'>
          <div>{team_members}</div>
        </div>
      </div>
    </div>
  );
}

export default TeamCard;
