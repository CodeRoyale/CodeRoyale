import React from 'react';
import { Icon, Whisper, Tooltip } from 'rsuite';
// import Button from '../../components/button/Button';

function CloseRoomView({ setState }) {
  //TODO: Check if the room is closing by admin or not...
  //TODO: Give an indication of room closed...
  //TODO: Ask again in an alert box to close room...

  return (
    <div className='close-room-view'>
      <div>
        <Whisper
          trigger='hover'
          placement='left'
          speaker={<Tooltip>Close Room</Tooltip>}
        >
          <Icon
            icon='close'
            size='lg'
            onClick={() => {
              setState({ action: 'CLOSE_ROOM' });
            }}
          />
        </Whisper>
      </div>
    </div>
  );
}

export default CloseRoomView;
