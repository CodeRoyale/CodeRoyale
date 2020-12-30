import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { leaveTeam } from '../../actions/teamActions';

function LeaveTeamView({ socketData, leaveTeam }) {
  const socket = socketData.socket;
  const [state, setState] = useState({
    leaveTeamClicked: false,
  });
  const { leaveTeamClicked } = state;

  // Leave Team...
  useEffect(() => {
    if (leaveTeamClicked) {
      leaveTeam(socket);
      setState({ ...state, leaveTeamClicked: false });
    }
  }, [leaveTeamClicked, state, socket, leaveTeam]);

  return (
    <div>
      <img
        src='/images/close_button_white.svg'
        alt=''
        className='close-team-close-button'
        onClick={() => {
          setState({ ...state, leaveTeamClicked: true });
        }}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  socketData: state.socketData,
});

export default connect(mapStateToProps, { leaveTeam })(LeaveTeamView);
