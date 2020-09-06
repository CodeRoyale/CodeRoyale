import React, { useState, useEffect } from 'react';
import { mapStateToProps } from '../../utils/mapStateToProps';
import { joinTeam } from '../../actions/joinTeamAction';
import { connect } from 'react-redux';

function JoinTeamView({ team_name, socketData, joinTeam }) {
  const socket = socketData.socket;
  const [state, setState] = useState({
    joinTeamClicked: false,
    actionDone: false,
  });
  const { joinTeamClicked, actionDone } = state;

  // joinTeam...
  useEffect(() => {
    if (joinTeamClicked) {
      joinTeam(socket, { team_name });
      setState({ ...state, joinTeamClicked: false, actionDone: true });
    }
  }, [joinTeamClicked, joinTeam, socket, team_name, state]);

  // Alert Message...
  if (actionDone) {
    // TODO: Alert message for the response from server...
    setState({ ...state, actionDone: false });
  }

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

const mapDispatchToProps = (dispatch) => {
  return {
    joinTeam: (socket, { team_name }) =>
      dispatch(joinTeam(socket, { team_name })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinTeamView);
