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

  // Close Room...
  useEffect(() => {
    if (state.closeRoomClicked) {
      socket.emit('CLOSE_ROOM', {}, (data) => {
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
          onClick={() => setState({ ...state, createTeamClicked: true })}
          buttonStyle='btn--primary--normal'
          buttonSize='btn--small'
        >
          Create Team
        </Button>
      </div>
      <div className='create-team-submit-container'>
        <Button
          type='button'
          onClick={() => setState({ ...state, closeRoomClicked: true })}
          buttonStyle='btn--primary--normal'
          buttonSize='btn--small'
        >
          Close Room
        </Button>
      </div>
    </div>
  );
}

export default CreateTeamView;
