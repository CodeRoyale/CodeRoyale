import React, { useState, useEffect } from 'react';
import { Whisper, Tooltip, Modal, Button } from 'rsuite';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../utils/mapStateToProps';
import { ROOM_CLOSED } from '../../utils/constants';
import { closeRoom } from '../../actions/roomActions';
import { Redirect } from 'react-router';

function CloseRoomView({ roomData, socketData, closeRoom }) {
  //TODO: Check if the room is closing by admin or not...

  const [showPrompt, setShowPrompt] = useState(false);
  const socket = socketData.socket;
  const [state, setState] = useState({
    closeRoomClicked: false,
  });
  const { closeRoomClicked } = state;
  const [redirect, setRedirect] = useState(false);

  //Close Room...
  useEffect(() => {
    if (closeRoomClicked) {
      closeRoom(socket);
      setState({ ...state, closeRoomClicked: false });
    }
  }, [closeRoomClicked, closeRoom, socket, state]);

  useEffect(() => {
    if (roomData.type === ROOM_CLOSED) {
      setRedirect(true);
    }
  });

  if (redirect) {
    return <Redirect to='/lobby' />;
  }

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
            onClick={() => setState({ ...state, closeRoomClicked: true })}
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

export default connect(mapStateToProps, { closeRoom })(CloseRoomView);
