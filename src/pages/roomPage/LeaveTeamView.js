import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../utils/mapStateToProps';
import { leaveTeam } from '../../actions/leaveTeamAction';

function LeaveTeamView({ socketData, leaveTeam }) {
  const socket = socketData.socket;
  const [state, setState] = useState({
    leaveTeamClicked: false,
    actionDone: false,
  });
  const { leaveTeamClicked, actionDone } = state;

  // Leave Team...
  useEffect(() => {
    if (leaveTeamClicked) {
      leaveTeam(socket);
      setState({ ...state, leaveTeamClicked: false, actionDone: true });
    }
  }, [leaveTeamClicked, state, socket, leaveTeam]);

  if (actionDone) {
    //TODO: Alert message here...
    setState({ ...state, actionDone: false });
  }

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

const mapDispatchToProps = (dispatch) => {
  return {
    leaveTeam: (socket) => dispatch(leaveTeam(socket)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaveTeamView);
