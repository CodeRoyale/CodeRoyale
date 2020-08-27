import React from 'react';

function JoinTeamView({ setState, team_name }) {
  return (
    <div>
      <img
        src='/images/add_button_white.svg'
        alt=''
        className='join-team-add-button'
        onClick={() => setState({ action: 'JOIN_TEAM', team_name: team_name })}
      />
    </div>
  );
}

export default JoinTeamView;
