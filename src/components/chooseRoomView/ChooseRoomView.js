import React from 'react';
import './ChooseRoomView.css';
import Button from '../button/Button';

function ChooseRoomView() {
  const onClickCreateRoom = () => {
    //TODO: Write here...
  };

  const onClickJoinRoom = () => {
    //TODO: Write here...
  };
  return (
    <div>
      <div className='choose-create-room-button'>
        <Button
          type='button'
          onClick={onClickCreateRoom}
          buttonStyle='btn--primary--normal'
          buttonSize='btn--medium'
        >
          Create Room
        </Button>
      </div>
      <div className='choose-join-room-button'>
        <Button
          type='button'
          onClick={onClickJoinRoom}
          buttonStyle='btn--primary--normal'
          buttonSize='btn--medium'
        >
          Join Room
        </Button>
      </div>
    </div>
  );
}

export default ChooseRoomView;
