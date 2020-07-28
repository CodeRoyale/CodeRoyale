import React, { useState } from 'react';
import './JoinRoomView.css';
import Button from '../button/Button';

function JoinRoomView() {
  const [joinInputValue, setJoinInputValue] = useState('');

  const onClickJoinButton = () => {
    // TODO: Write here...
  };

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
          onClick={onClickJoinButton}
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
