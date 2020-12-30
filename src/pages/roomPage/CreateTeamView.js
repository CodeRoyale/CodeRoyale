import React, { useState, useEffect } from 'react';
import { Modal, Input, Button } from 'rsuite';
import { createTeam } from '../../actions/teamActions';
import { connect } from 'react-redux';

function CreateTeamView({ socketData, createTeam, show, onClose }) {
  const [state, setState] = useState({
    team_name: '',
    createTeamClicked: false,
  });
  const { team_name, createTeamClicked } = state;
  const socket = socketData.socket;

  //Create Team...
  useEffect(() => {
    if (createTeamClicked) {
      createTeam(socket, { team_name });
      setState({
        ...state,
        team_name: '',
        createTeamClicked: false,
      });
    }
  }, [createTeamClicked, setState, state, socket, team_name, createTeam]);

  return (
    <div>
      <Modal size='xs' show={show} onHide={onClose}>
        <Modal.Header>
          <Modal.Title>Create Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            style={{ width: 300 }}
            value={team_name}
            onChange={(value) => {
              setState({ ...state, team_name: value });
            }}
            placeholder='Enter Team Name...'
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setState({ ...state, createTeamClicked: true });
            }}
            appearance='primary'
          >
            Create Team
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => ({
  socketData: state.socketData,
});

export default connect(mapStateToProps, { createTeam })(CreateTeamView);
