import React, { useState } from 'react';
import { Whisper, Tooltip, Modal, Button } from 'rsuite';

function CloseRoomView({ setState }) {
  //TODO: Check if the room is closing by admin or not...

  const [showPrompt, setShowPrompt] = useState(false);

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
          onClick={() => setShowPrompt(true)}
        />
      </Whisper>

      <Modal
        backdrop
        show={showPrompt}
        onHide={() => setShowPrompt(false)}
        size='xs'
      >
        <Modal.Header>
          <Modal.Title>Close Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this room..</Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => setState({ action: 'CLOSE_ROOM' })}
            appearance='primary'
          >
            Ok
          </Button>
          <Button onClick={() => setShowPrompt(false)} appearance='subtle'>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CloseRoomView;
