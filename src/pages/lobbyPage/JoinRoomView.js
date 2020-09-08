import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { ROOM_JOINED } from '../../utils/constants';
import { mapStateToProps } from '../../utils/mapStateToProps';
import { connect } from 'react-redux';
import { joinRoom } from '../../actions/roomActions';
import { Alert } from 'rsuite';
import Button from '../../components/button/Button';

function JoinRoomView({ socketData, roomData, joinRoom }) {
  // TODO: Have to include code for what happens if false....
  // TODO: Have to include code for indicating the joining of room...

  const [state, setState] = useState({
    joinButtonClicked: false,
    actionDone: false,
    joinInputValue: '',
  });
  const { joinButtonClicked, actionDone, joinInputValue } = state;
  const socket = socketData.socket;
  const room_id = joinInputValue.toString().trim();

  // Join Room...
  useEffect(() => {
    if (joinButtonClicked) {
      joinRoom(socket, { room_id });
      setState({ ...state, joinButtonClicked: false, actionDone: true });
    }
  }, [joinButtonClicked, setState, socket, room_id, joinRoom, state]);

  // After successful joining...
  if (actionDone && roomData.type === ROOM_JOINED) {
    Alert.success('Joined a room');
    return <Redirect to={{ pathname: '/room' }} />;
  } else if (actionDone && roomData.type !== ROOM_JOINED && !roomData.loading) {
    Alert.error(roomData.error);
    setState({ ...state, actionDone: false });
  }

  // Main Render...
  return (
    <div>
      <div className='join-room-join-input-container'>
        <input
          type='text'
          className='join-room-join-input'
          onChange={(event) =>
            setState({ ...state, joinInputValue: event.target.value })
          }
          value={joinInputValue}
          placeholder='Enter Room ID...'
        />
      </div>
      <div className='join-room-join-button-container'>
        <Button
          type='button'
          onClick={() => setState({ ...state, joinButtonClicked: true })}
          buttonStyle='btn--primary--normal'
          buttonSize='btn--medium'
        >
          Join
        </Button>
      </div>
    </div>
  );
}
export default connect(mapStateToProps, { joinRoom })(JoinRoomView);
