import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { ROOM_JOINED } from '../../utils/constants';
import { mapStateToProps } from '../../utils/mapStateToProps';
import { connect } from 'react-redux';
import { joinRoom } from '../../actions/roomActions';
import { Alert, Input, InputGroup, Icon } from 'rsuite';

function JoinRoomView({ socketData, roomData, joinRoom }) {
  const [state, setState] = useState({
    joinButtonClicked: false,
    actionDone: false,
    joinInputValue: '',
  });
  const [redirect, setRedirect] = useState(false);
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
  useEffect(() => {
    if (actionDone && roomData.type === ROOM_JOINED) {
      Alert.success('Joined a room');
      setRedirect(true);
    } else if (
      actionDone &&
      roomData.type !== ROOM_JOINED &&
      !roomData.loading
    ) {
      Alert.error(roomData.error);
      setState({ ...state, actionDone: false });
    }
  }, [actionDone, roomData.type, roomData.loading, roomData.error, state]);

  // Redirect to room..
  if (redirect) {
    return <Redirect to='/room' />;
  }

  const onClickJoinRoom = (event) => {
    event.preventDefault();
    setState({ ...state, joinButtonClicked: true });
  };

  // Main Render...
  return (
    <div>
      <form onSubmit={onClickJoinRoom}>
        <InputGroup style={{ marginLeft: '15px' }}>
          <Input
            onChange={(value) => setState({ ...state, joinInputValue: value })}
            value={joinInputValue}
            placeholder='Enter Room ID'
          />
          <InputGroup.Button onClick={onClickJoinRoom}>
            <Icon icon='arrow-down2' rotate={270} />
          </InputGroup.Button>
        </InputGroup>
      </form>
    </div>
  );
}
export default connect(mapStateToProps, { joinRoom })(JoinRoomView);
