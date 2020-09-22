import React, { useState, useEffect } from 'react';
import Button from '../../components/button/Button';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { createRoom } from '../../actions/roomActions';
import { ROOM_CREATED } from '../../utils/constants';
import { timeToString } from '../../utils/timeToString';
import { mapStateToProps } from '../../utils/mapStateToProps';
import { Alert, Modal, SelectPicker, Checkbox } from 'rsuite';
import Divider from '../../components/divider/Divider';

function CreateRoomView({ roomData, socketData, createRoom, show, onClose }) {
  const socket = socketData.socket;
  const [state, setState] = useState({
    createRoomClicked: false,
    actionDone: false,
  });
  const [redirect, setRedirect] = useState(false);
  const [team_data, setTeamData] = useState({
    max_teams: 2,
    max_perTeam: 1,
    max_perRoom: 2,
    timeLimit: 0.5 * 60 * 60 * 60,
    max_questions: 3,
    max_vote: 1,
    veto_quesCount: 3,
    privateRoom: true,
  });
  const { createRoomClicked, actionDone } = state;
  const {
    max_teams,
    max_perTeam,
    max_perRoom,
    privateRoom,
    max_questions,
    max_vote,
    veto_quesCount,
    timeLimit,
  } = team_data;

  // Create room...
  useEffect(() => {
    if (createRoomClicked) {
      createRoom(socket, team_data);
      setState({ ...state, createRoomClicked: false, actionDone: true });
    }
  }, [
    createRoomClicked,
    createRoom,
    socket,
    team_data,
    setState,
    state,
    actionDone,
  ]);

  // If room created successfully....
  useEffect(() => {
    if (actionDone && roomData.type === ROOM_CREATED) {
      Alert.success('Room Created Successfully');
      setRedirect(true);
    } else if (
      actionDone &&
      !roomData.loading &&
      roomData.type !== ROOM_CREATED
    ) {
      Alert.error(roomData.error);
      setState({ ...state, actionDone: false });
    }
  }, [
    actionDone,
    roomData.type,
    roomData.loading,
    roomData.error,
    state,
    roomData,
  ]);

  // Redirect to room...
  if (redirect) {
    return <Redirect to='/room' />;
  }

  // intitializations for menu...
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let numberVotes = [];
  const times = [0.5, 1, 3, 6, 12, 24, 48];

  for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i];
    numbers[i] = { label: number, value: number };
  }

  for (let i = 0; i < times.length; i++) {
    const time = times[i];
    times[i] = {
      label: timeToString(time),
      value: time * 60 * 60 * 60,
    };
  }

  for (let i = 1; i < veto_quesCount; i++) {
    numberVotes.push({ label: i, value: i });
  }

  const DropdownNumbers = (title, data, key, value) => {
    return (
      <div className='create-room-drop-item'>
        <div>{title}</div>
        <SelectPicker
          style={{ width: '130px' }}
          data={data}
          placement='autoVerticalStart'
          searchable={false}
          placeholder={value}
          preventOverflow
          appearance='subtle'
          onClean={() => {
            setTeamData({ ...team_data });
          }}
          onChange={(value) => {
            let newTeamData = { ...team_data };
            newTeamData[key] = value;
            setTeamData(newTeamData);
          }}
        />
      </div>
    );
  };
  const maxTeamView = DropdownNumbers(
    'Maximum Teams',
    numbers,
    'max_teams',
    max_teams
  );
  const maxPerRoomView = DropdownNumbers(
    'Maximum players in the room',
    numbers,
    'max_perRoom',
    max_perRoom
  );
  const maxPerTeamView = DropdownNumbers(
    'Maximum players per team',
    numbers,
    'max_perTeam',
    max_perTeam
  );
  const maxQuestionsView = DropdownNumbers(
    'Maximum Question',
    numbers,
    'max_questions',
    max_questions
  );
  const maxVoteView = DropdownNumbers(
    'Maximum Votes',
    numberVotes,
    'max_vote',
    max_vote
  );
  const vetoQuestionCountView = DropdownNumbers(
    'Veto Question Count',
    numbers,
    'veto_quesCount',
    veto_quesCount
  );
  const timeLimitView = DropdownNumbers(
    'Time Limit',
    times,
    'timeLimit',
    timeToString(timeLimit / (60 * 60 * 60))
  );
  const privateRoomView = (
    <>
      <Checkbox
        value={privateRoom}
        onChange={() =>
          setTeamData({ ...team_data, privateRoom: !privateRoom })
        }
      >
        private Room
      </Checkbox>
    </>
  );

  // Main Render...
  return (
    <div>
      <Modal overflow={true} show={show} onHide={() => onClose(false)}>
        <Modal.Header>
          <Modal.Title>Create Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='create-room'>
            <div className='create-room-left'>
              <div>
                {maxTeamView}
                {maxPerRoomView}
                {maxPerTeamView}
                {privateRoomView}
              </div>
            </div>
            <Divider />
            <div className='create-room-right'>
              <div>
                {maxQuestionsView}
                {maxVoteView}
                {vetoQuestionCountView}
                {timeLimitView}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div style={{ textAlign: 'center' }}>
            <Button
              type='button'
              onClick={() => setState({ ...state, createRoomClicked: true })}
              buttonStyle='btn--primary--normal'
              buttonSize='btn--medium'
            >
              Create Room
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default connect(mapStateToProps, { createRoom })(CreateRoomView);
