import React, { useState, useEffect } from 'react';
import Button from '../../components/button/Button';

function CreateTeamView({ socket, room_id }) {
  const [team_name, setCreateTeamInput] = useState('');
  const [createTeamClicked, setCreateTeamClicked] = useState(false);

  // Create team...
  useEffect(() => {
    if (createTeamClicked) {
      socket.emit('CREATE_TEAM', { team_name }, (data) => {
        console.log(data);
      });
    }
  });

  return (
    <div className='create-team-container'>
      <div className='create-team-input-container'>
        <input
          type='text'
          className='create-team-input'
          value={team_name}
          onChange={(event) => setCreateTeamInput(event.target.value)}
          placeholder='Enter a Team Name...'
        />
      </div>
      <div className='create-team-submit-container'>
        <Button
          type='button'
          onClick={() => setCreateTeamClicked(true)}
          buttonStyle='btn--primary--normal'
          buttonSize='btn--small'
        >
          Create Team
        </Button>
      </div>
    </div>
  );
}

export default CreateTeamView;
