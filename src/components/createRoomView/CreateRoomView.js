import React, { useState, useEffect } from 'react';
import './CreateRoomView.css';
import Button from '../button/Button';
import copy from 'copy-to-clipboard';

function CreateRoomView({ socket }) {
  const GENERATE_LINK = 'Generate Room Link';
  const COPY_TO_CLIPBOARD = 'Copy to Clipboard';
  const [generateClicked, setGenerateClicked] = useState(false);
  const [roomId, setRoomId] = useState('');
  const [generateButtonText, setGenerateButtonText] = useState(GENERATE_LINK);

  const onClickGenerateButton = () => {
    if (generateButtonText === COPY_TO_CLIPBOARD) {
      copy(roomId);
    } else if (generateButtonText === GENERATE_LINK) {
      setGenerateClicked(true);
    }
  };

  // TODO: Have to include code for what happens if false....
  // Create room...
  useEffect(() => {
    if (generateClicked) {
      socket.emit('CREATE_ROOM', {}, (data) => {
        console.log(data);
        setRoomId(data.admin);
        setGenerateButtonText(COPY_TO_CLIPBOARD);
      });
    }
  }, [generateClicked, socket]);

  // Main Render...
  return (
    <div>
      {generateClicked ? (
        <>
          <div className='create-room-text-heading'>Your Room ID</div>
          <div className='create-room-link'>{roomId}</div>
        </>
      ) : null}
      <div className='create-room-copy-button-container'>
        <Button
          type='button'
          onClick={onClickGenerateButton}
          buttonStyle='btn--primary--normal'
          buttonSize='btn--medium'
        >
          {generateButtonText}
        </Button>
      </div>
    </div>
  );
}

export default CreateRoomView;
