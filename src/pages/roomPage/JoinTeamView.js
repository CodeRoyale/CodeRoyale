import React, { useState, useEffect } from 'react';
import ERROR_MSG from '../../utils/constants';

function JoinTeamView({ socket, team_name }) {
  const [state, setState] = useState({ joinTeamClicked: false, data: null });

  useEffect(() => {
    if (state.joinTeamClicked && socket !== null && team_name !== null) {
      socket.emit('JOIN_TEAM', { team_name }, (data) => {
        if (data !== ERROR_MSG) {
          console.log(data);
          setState({ ...state, joinTeamClicked: true, data: data });
        } else {
          console.log(data);
        }
      });
      setState({ ...state, joinTeamClicked: false });
    }
  }, [state, socket, team_name]);
  return (
    <div>
      <img
        src='/images/add_button_white.svg'
        alt=''
        className='join-team-add-button'
        onClick={() => setState({ ...state, joinTeamClicked: true })}
      />
    </div>
  );
}

export default JoinTeamView;
