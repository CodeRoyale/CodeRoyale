import React from 'react';
import { Whisper, Tooltip } from 'rsuite';
// import Button from '../../components/button/Button';

function CloseRoomView({ setState }) {
  //TODO: Check if the room is closing by admin or not...
  //TODO: Give an indication of room closed...
  //TODO: Ask again in an alert box to close room...

  return (
    <div className='close-room-view'>
      <Whisper
        trigger='hover'
        placement='right'
        speaker={<Tooltip>Close Room</Tooltip>}
      >
        <img
          className='close-room-button'
          src='/images/close_button_black.svg'
          alt=''
          onClick={() => {
            console.log('Clicked Close room');
            // setState({ action: 'CLOSE_ROOM' })
          }}
        />
      </Whisper>
    </div>
  );
}

export default CloseRoomView;
