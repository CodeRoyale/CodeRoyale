import React, { useState, useEffect } from 'react';
import { mapStateToProps } from '../../utils/mapStateToProps';
import { joinTeam } from '../../actions/teamActions';
import { connect } from 'react-redux';

function JoinTeamView({ team_name, socketData, joinTeam }) {
  const socket = socketData.socket;
  const [state, setState] = useState({
    joinTeamClicked: false,
  });
  const { joinTeamClicked } = state;

  // joinTeam...
  useEffect(() => {
    if (joinTeamClicked) {
      joinTeam(socket, { team_name });
      setState({ ...state, joinTeamClicked: false });
    }
  }, [joinTeamClicked, joinTeam, socket, team_name, state]);

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

export default connect(mapStateToProps, { joinTeam })(JoinTeamView);
