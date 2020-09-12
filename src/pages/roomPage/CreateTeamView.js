import React, { useState, useEffect } from 'react';
import { InputGroup, Input, Icon } from 'rsuite';
import { createTeam } from '../../actions/teamActions';
import { mapStateToProps } from '../../utils/mapStateToProps';
import { connect } from 'react-redux';

function CreateTeamView({ socketData, createTeam }) {
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

  // onClick button...
  const onClickCreateButton = () => {
    setState({
      ...state,
      createTeamClicked: true,
    });
  };

  //Styling constants...
  const inputBorderRadius = 50;
  const inputHeight = '40px';
  return (
    <div className='create-team'>
      <div>
        <InputGroup
          style={{
            borderRadius: inputBorderRadius,
            height: inputHeight,
          }}
        >
          <Input
            style={{
              borderTopLeftRadius: inputBorderRadius,
              borderBottomLeftRadius: inputBorderRadius,
            }}
            placeholder='Create Team...'
            value={team_name}
            onChange={(value, event) =>
              setState({ ...state, team_name: value })
            }
          />
          <InputGroup.Button
            style={{
              borderTopRightRadius: inputBorderRadius,
              borderBottomRightRadius: inputBorderRadius,
            }}
            onClick={onClickCreateButton}
          >
            <Icon icon='plus-circle' size='lg' />
          </InputGroup.Button>
        </InputGroup>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, { createTeam })(CreateTeamView);
