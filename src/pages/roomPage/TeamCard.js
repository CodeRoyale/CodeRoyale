import React from 'react';
import TeamMemberCard from './TeamMemberCard';
import JoinTeamView from './JoinTeamView';
import CloseTeamView from './CloseTeamView';

function TeamCard({ team_name, team, setState }) {
  // Setting team members cards...
  const team_members = team.map((username) => (
    <TeamMemberCard key={username} username={username} />
  ));
  return (
    <div className='team-card'>
      <div className='team-card-team-name-container'>
        <div className='team-card-team-name-text'>{team_name}</div>
        <div className='team-card-team-name-button-container'>
          <div className='team-card-team-name-button-container-row'>
            <CloseTeamView setState={setState} />
            <JoinTeamView team_name={team_name} setState={setState} />
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
