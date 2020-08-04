import React from 'react';
import './ChooseRoomView.css';
import Button from '../button/Button';

function ChooseRoomView({ onClickChoose }) {
  const onClickCreateRoom = () => {
    onClickChoose('CREATE_ROOM');
  };

  const onClickJoinRoom = () => {
    onClickChoose('JOIN_ROOM');
  };
  return (
    <div>
      <div
        data-testid='choose-create-room-button'
        className='choose-create-room-button'
      >
        <Button
          type='button'
          onClick={onClickCreateRoom}
          buttonStyle='btn--primary--normal'
          buttonSize='btn--medium'
        >
          Create Room
        </Button>
      </div>
      <div
        data-testid='choose-join-room-button'
        className='choose-join-room-button'
      >
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
