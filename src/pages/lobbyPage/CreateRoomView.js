import React, { useState, useEffect } from 'react';
import './LobbyMain.css';
import Button from '../../components/button/Button';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { createRoom } from '../../actions/createRoomActions';
import { ROOM_CREATED } from '../../utils/constants';

function CreateRoomView({ roomData, socketData, createRoom }) {
  // TODO: Have to include code for indicating the creation of room...
  // TODO: Have to show error if there is any...
  // TODO: Make UI good...
  const [createRoomClicked, setCreateRoomClicked] = useState(false);
  const [state, setState] = useState({
    max_teams: 2,
    max_perTeam: 1,
    max_perRoom: 2,
    timeLimit: 0.5 * 60 * 60 * 60,
    max_questions: 3,
    max_vote: 1,
    veto_quesCount: 3,
    privateRoom: true,
  });
  const {
    max_teams,
    max_perTeam,
    max_perRoom,
    timeLimit,
    privateRoom,
    max_questions,
    max_vote,
    veto_quesCount,
  } = state;
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const times = [0.5, 1, 3, 6, 12, 24, 48];
  const socket = socketData.socket;

  // Create room...
  useEffect(() => {
    if (createRoomClicked) {
      createRoom(socket, state);
      setCreateRoomClicked(false);
    }
  }, [createRoomClicked, createRoom, setCreateRoomClicked, socket, state]);

  // If room created successfully....
  if (roomData.type === ROOM_CREATED) {
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
            setState({ ...state, max_teams: parseInt(e.target.value) })
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
            setState({ ...state, max_perRoom: parseInt(e.target.value) })
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
            setState({ ...state, max_perTeam: parseInt(e.target.value) })
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
            setState({
              ...state,
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
            setState({ ...state, max_questions: parseInt(e.target.value) })
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
            setState({ ...state, max_vote: parseInt(e.target.value) })
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
            setState({ ...state, veto_quesCount: parseInt(e.target.value) })
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
          onChange={() => setState({ ...state, privateRoom: !privateRoom })}
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
          onClick={() => setCreateRoomClicked(true)}
          buttonStyle='btn--primary--normal'
          buttonSize='btn--medium'
        >
          Create Room
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    socketData: state.socketData,
    roomData: state.roomData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createRoom: (socket, state) => dispatch(createRoom(socket, state)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateRoomView);
