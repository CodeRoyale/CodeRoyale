import React, { useState, useEffect, useContext } from 'react';
import './LobbyMain.css';
import { Redirect } from 'react-router';
import Button from '../../components/button/Button';
import { ERROR_MSG } from '../../utils/constants';
import SocketContext from '../../utils/SocketContext';

function JoinRoomView() {
  const [joinInputValue, setJoinInputValue] = useState('');
  const socket = useContext(SocketContext);
  const [state, setState] = useState({
    roomJoined: false,
    joinButtonClicked: false,
    room_id: '',
  });
  const { roomJoined, room_id, joinButtonClicked } = state;

  // TODO: Have to include code for what happens if false....
  // TODO: Have to include code for indicating the joining of room...
  // Join Room...
  useEffect(() => {
    let room_id;
    if (joinButtonClicked) {
      room_id = joinInputValue.toString().trim();
      socket.emit('JOIN_ROOM', { room_id }, (data) => {
        if (data !== ERROR_MSG) {
          setState({
            ...state,
            roomJoined: true,
            room_id: data.config.id,
            joinButtonClicked: false,
          });
        } else {
          setState({ ...state, joinButtonClicked: false });
        }
        console.log(data);
      });
    }
  });

  // After successful joining...
  if (roomJoined) {
    return (
      <Redirect
        to={{ pathname: '/room', props: { room_id: room_id, socket: socket } }}
      />
    );
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

export default JoinRoomView;
