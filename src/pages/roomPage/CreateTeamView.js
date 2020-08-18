import React, { useState, useEffect } from 'react';
import Button from '../../components/button/Button';

function CreateTeamView({ socket, room_id }) {
  const [team_name, setCreateTeamInput] = useState('');
  const [state, setState] = useState({
    createTeamClicked: false,
    closeRoomClicked: false,
    teams: null,
  });

  // TODO: Have to write code for indication for creation of team...
  // Create team...
  useEffect(() => {
    if (state.createTeamClicked && team_name) {
      socket.emit('CREATE_TEAM', { team_name }, (data) => {
        if (data !== null) {
          console.log(data);
          setState({ ...state, createTeamClicked: false, teams: data });
        }
      });
    }
  });

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
            onClick={() => setState({ ...state, createTeamClicked: true })}
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
