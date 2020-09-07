import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { ROOM_JOINED } from '../../utils/constants';
import { mapStateToProps } from '../../utils/mapStateToProps';
import { connect } from 'react-redux';
import { joinRoom } from '../../actions/roomActions';
import Button from '../../components/button/Button';

function JoinRoomView({ socketData, roomData, joinRoom }) {
  // TODO: Have to include code for what happens if false....
  // TODO: Have to include code for indicating the joining of room...

  const [joinInputValue, setJoinInputValue] = useState('');
  const [joinButtonClicked, setJoinButtonClicked] = useState(false);
  const socket = socketData.socket;
  const room_id = joinInputValue.toString().trim();

  // Join Room...
  useEffect(() => {
    if (joinButtonClicked) {
      joinRoom(socket, { room_id });
      setJoinButtonClicked(false);
    }
  }, [joinButtonClicked, setJoinButtonClicked, socket, room_id, joinRoom]);

  // After successful joining...
  if (roomData.type === ROOM_JOINED) {
    return <Redirect to={{ pathname: '/room' }} />;
  }

  // Main Render...
  return (
    <div>
      <div className='join-room-join-input-container'>
        <input
          type='text'
          className='join-room-join-input'
          onChange={(event) => setJoinInputValue(event.target.value)}
          value={joinInputValue}
          placeholder='Enter Room ID...'
        />
      </div>
      <div className='join-room-join-button-container'>
        <Button
          type='button'
          onClick={() => setJoinButtonClicked(true)}
          buttonStyle='btn--primary--normal'
          buttonSize='btn--medium'
        >
          Join
        </Button>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    joinRoom: (socket, { room_id }) => dispatch(joinRoom(socket, { room_id })),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(JoinRoomView);
