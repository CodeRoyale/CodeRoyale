import React from 'react';
import './CreateRoomView.css';
import Button from '../button/Button';

function CreateRoomView() {
  const onClickCreateButton = () => {
    // TODO: Write onClick function...
  };
  return (
    <div>
      <div className='create-room-text-heading'>Your Room ID</div>
      <div className='create-room-link'></div>
      <div className='create-room-copy-button-container'>
        <Button
          type='button'
          onClick={onClickCreateButton}
          buttonStyle='btn--primary--normal'
          buttonSize='btn--medium'
        >
          Generate Room Link
        </Button>
      </div>
    </div>
  );
}

export default CreateRoomView;
