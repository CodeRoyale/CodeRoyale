import React, { useState, useEffect } from 'react';
import './LobbyMain.css';
import Button from '../../components/button/Button';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { createRoom } from '../../actions/roomActions';
import { ROOM_CREATED } from '../../utils/constants';
import { mapStateToProps } from '../../utils/mapStateToProps';
import { Alert } from 'rsuite';

function CreateRoomView({ roomData, socketData, createRoom }) {
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
    timeLimit,
    privateRoom,
    max_questions,
    max_vote,
    veto_quesCount,
  } = team_data;
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const times = [0.5, 1, 3, 6, 12, 24, 48];
  const socket = socketData.socket;

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

  // options for creating room....
  const optionNumbers = numbers.map((number) => (
    <option key={number} value={number}>
      {number}
    </option>
  ));
  const maxTeamView = (
    <>
      <div>Maximum team</div>
      <div>
        <select
          value={max_teams}
          onChange={(e) =>
            setTeamData({ ...team_data, max_teams: parseInt(e.target.value) })
          }
        >
          {optionNumbers}
        </select>
      </div>
    </>
  );

  const maxPerRoomView = (
    <>
      <div>Maximum players in the room</div>
      <div>
        <select
          value={max_perRoom}
          onChange={(e) =>
            setTeamData({ ...team_data, max_perRoom: parseInt(e.target.value) })
          }
        >
          {optionNumbers}
        </select>
      </div>
    </>
  );

  const maxPerTeamView = (
    <>
      <div>Maximum players per team</div>
      <div>
        <select
          value={max_perTeam}
          onChange={(e) =>
            setTeamData({ ...team_data, max_perTeam: parseInt(e.target.value) })
          }
        >
          {optionNumbers}
        </select>
      </div>
    </>
  );

  const timeLimitView = (
    <>
      <div>Time Limit</div>
      <div>
        <select
          value={timeLimit}
          onChange={(e) =>
            setTeamData({
              ...team_data,
              timeLimit: parseInt(e.target.value) * 60 * 60 * 60,
            })
          }
        >
          {times.map((time) => (
            <option key={time} value={time}>
              {
                // Converting time to strings...
                time < 1
                  ? (time * 60).toString() + ' Minutes'
                  : time < 24
                  ? time.toString() + ' Hours'
                  : (time / 24).toString() + ' Day'
              }
            </option>
          ))}
        </select>
      </div>
    </>
  );
  const maxQuestionsView = (
    <>
      <div>Maximum Questions</div>
      <div>
        <select
          value={max_questions}
          onChange={(e) =>
            setTeamData({
              ...team_data,
              max_questions: parseInt(e.target.value),
            })
          }
        >
          {optionNumbers}
        </select>
      </div>
    </>
  );

  const maxVoteView = (
    <>
      <div>Maximum Votes</div>
      <div>
        <select
          value={max_vote}
          onChange={(e) =>
            setTeamData({ ...team_data, max_vote: parseInt(e.target.value) })
          }
        >
          {optionNumbers}
        </select>
      </div>
    </>
  );
  const vetoQuestionCountView = (
    <>
      <div>Veto Question Count</div>
      <div>
        <select
          value={veto_quesCount}
          onChange={(e) =>
            setTeamData({
              ...team_data,
              veto_quesCount: parseInt(e.target.value),
            })
          }
        >
          {optionNumbers}
        </select>
      </div>
    </>
  );
  const privateRoomView = (
    <>
      <div>
        <input
          type='checkbox'
          value={privateRoom}
          onChange={() =>
            setTeamData({ ...team_data, privateRoom: !privateRoom })
          }
        />{' '}
        Private Room
      </div>
    </>
  );

  // Main Render...
  return (
    <div>
      <div className='create-room-options-choose-container'>
        {maxTeamView}
        {maxPerRoomView}
        {maxPerTeamView}
        {timeLimitView}
        {privateRoomView}
        {maxQuestionsView}
        {maxVoteView}
        {vetoQuestionCountView}
      </div>
      <div className='create-room-button-container'>
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
  );
}

export default connect(mapStateToProps, { createRoom })(CreateRoomView);
