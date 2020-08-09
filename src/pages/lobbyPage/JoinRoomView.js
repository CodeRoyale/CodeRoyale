import React, { useState, useEffect } from 'react';
import './LobbyMain.css';
import Button from '../../components/button/Button';

function JoinRoomView({ socket }) {
  const [joinInputValue, setJoinInputValue] = useState('');
  const [joinButtonClicked, setJoinButtonClicked] = useState(false);

  // TODO: Have to include code for what happens if false....
  // TODO: Have to include code for indicating the joining of room...
  // Join Room...
  useEffect(() => {
    let room_id;
    if (joinButtonClicked) {
      room_id = joinInputValue.toString().trim();
      socket.emit('JOIN_ROOM', { room_id }, (data) => {
        console.log(data);
      });
    }
  });

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

export default JoinRoomView;
