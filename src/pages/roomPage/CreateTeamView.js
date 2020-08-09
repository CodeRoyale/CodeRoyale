import React, { useState } from 'react';
import Button from '../../components/button/Button';

function CreateTeamView({ socket, room_id }) {
  const [createTeamInput, setCreateTeamInput] = useState('');

  // On Click create team...
  const onClickCreateTeam = () => {
    //TODO: Complete this....
  };

  return (
    <div className='create-team-container'>
      <div className='create-team-input-container'>
        <input
          type='text'
          className='create-team-input'
          value={createTeamInput}
          onChange={(event) => setCreateTeamInput(event.target.value)}
          placeholder='Enter a Team Name...'
        />
      </div>
      <div className='create-team-submit-container'>
        <Button
          type='button'
          onClick={onClickCreateTeam}
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
