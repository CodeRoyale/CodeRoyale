import React, { useState } from 'react';
import Button from '../../components/button/Button';

function CreateTeamView({ setState }) {
  //TODO:  Clean up input after click of button...
  const [team_name, setCreateTeamInput] = useState('');
  return (
    <div className='create-team-container'>
      <div>
        <div className='create-team-text'>
          <b>Create Room</b>
        </div>
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
            onClick={() =>
              setState({ action: 'CREATE_TEAM', team_name: team_name })
            }
            buttonStyle='btn--primary--normal'
            buttonSize='btn--medium'
          >
            Create Team
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateTeamView;
