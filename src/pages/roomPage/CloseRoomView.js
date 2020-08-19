import React, { useState, useEffect } from 'react';
import Button from '../../components/button/Button';
import { Redirect } from 'react-router';
import ERROR_MSG from '../../utils/constants';

function CloseRoomView({ socket }) {
  //TODO: Check if the room is closing by admin or not...
  //TODO: Give an indication of room closed...
  //TODO: Ask again in an alert box to close room...

  const [state, setState] = useState({
    closeRoomClicked: false,
    roomClosed: false,
  });
  useEffect(() => {
    if (state.closeRoomClicked && socket !== null) {
      socket.emit('CLOSE_ROOM', {}, (data) => {
        if (data !== ERROR_MSG && data) {
          setState({ ...state, closeRoomClicked: false, roomClosed: true });
        } else {
          console.log(data);
        }
      });
      setState({ ...state, closeRoomClicked: false });
    }
  }, [state, socket]);

  if (state.roomClosed) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='close-room-view'>
      <div className='close-room-view-text'>
        <b>Close Room</b>
      </div>
      <div className='close-room-view-button'>
        <Button
          type='button'
          onClick={() => setState({ ...state, closeRoomClicked: true })}
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
