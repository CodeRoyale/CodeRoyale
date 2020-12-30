import React, { useState, useEffect } from 'react';
import Button from '../../components/button/Button';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { createRoom } from '../../actions/roomActions';
import { ROOM_CREATED } from '../../utils/constants';
import { timeToString } from '../../utils/timeToString';
import { Alert, Icon, SelectPicker, Checkbox, Animation } from 'rsuite';

function CreateRoomView({ roomData, socketData, createRoom, show, onClose }) {
  const socket = socketData.socket;
  const history = useHistory();
  const [state, setState] = useState({
    createRoomClicked: false,
    actionDone: false,
  });
  const milliseconds = 60 * 60 * 1000;
  const [redirect, setRedirect] = useState(false);
  const [team_data, setTeamData] = useState({
    max_teams: 2,
    max_perTeam: 1,
    max_perRoom: 2,
    timeLimit: 0.5 * milliseconds,
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
    history.push('/room');
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
      value: time * milliseconds,
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
    'Max players in room',
    numbers,
    'max_perRoom',
    max_perRoom
  );
  const maxPerTeamView = DropdownNumbers(
    'Max players per team',
    numbers,
    'max_perTeam',
    max_perTeam
  );
  const maxQuestionsView = DropdownNumbers(
    'Max Question',
    numbers,
    'max_questions',
    max_questions
  );
  const maxVoteView = DropdownNumbers(
    'Max Votes',
    numberVotes,
    'max_vote',
    max_vote
  );
  const vetoQuestionCountView = DropdownNumbers(
    'Veto Questions',
    numbers,
    'veto_quesCount',
    veto_quesCount
  );
  const timeLimitView = DropdownNumbers(
    'Time Limit',
    times,
    'timeLimit',
    timeToString(timeLimit / milliseconds)
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
  return show ? (
    <div className='create-room'>
      <Animation.Bounce in={show}>
        <div className='create-room-modal'>
          <div className='create-room-modal-left'>
            <div>
              <h1>Create Room</h1>
              <p style={{ fontSize: '20px' }}>
                Invite Your Friends to <br /> join into the arena
                <br /> of Code !
              </p>
            </div>
          </div>
          <div className='create-room-modal-right'>
            <div className='create-room-modal-header'>
              <Icon
                style={{ cursor: 'pointer' }}
                icon='close'
                size='lg'
                onClick={() => onClose(false)}
              />
            </div>
            <div className='create-room-modal-body'>
              <div className='create-room-modal-body-left'>
                {maxTeamView}
                {maxPerRoomView}
                {maxPerTeamView}
                {privateRoomView}
              </div>
              <div className='create-room-modal-body-right'>
                {maxQuestionsView}
                {maxVoteView}
                {vetoQuestionCountView}
                {timeLimitView}
              </div>
            </div>
            <div className='create-room-modal-footer'>
              <Button
                type='button'
                onClick={() => setState({ ...state, createRoomClicked: true })}
                buttonStyle='btn--primary--normal'
                buttonSize='btn--medium'
              >
                Create Room
              </Button>
            </div>
          </div>
        </div>
      </Animation.Bounce>
    </div>
  ) : null;
}

const mapStateToProps = (state) => ({
  socketData: state.socketData,
  roomData: state.roomData,
});

export default connect(mapStateToProps, { createRoom })(CreateRoomView);
