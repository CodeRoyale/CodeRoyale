import React from 'react';
import Button from '../../components/button/Button';

function CloseRoomView({ setState }) {
  //TODO: Check if the room is closing by admin or not...
  //TODO: Give an indication of room closed...
  //TODO: Ask again in an alert box to close room...

  return (
    <div className='close-room-view'>
      <div className='close-room-view-text'>
        <b>Close Room</b>
      </div>
      <div className='close-room-view-button'>
        <Button
          type='button'
          onClick={() => setState({ action: 'CLOSE_ROOM' })}
          buttonStyle='btn--primary--normal'
          buttonSize='btn--medium'
        >
          Close Room
        </Button>
      </div>
    </div>
  );
}

export default CloseRoomView;
