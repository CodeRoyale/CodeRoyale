import React from 'react';
import ChatWindow from './ChatWindow';
import { Whisper, Tooltip } from 'rsuite';

function RoomChat({ socket, expand, setExpand }) {
  let roomChat = null;
  if (!expand) {
    roomChat = (
      <Whisper
        trigger='hover'
        placement='left'
        speaker={<Tooltip>Chat</Tooltip>}
      >
        <div className='room-chat-shrink' onClick={() => setExpand((e) => !e)}>
          <img
            style={{ width: '10px', height: '10px' }}
            src='/images/left-arrow.svg'
            alt=''
          />
        </div>
      </Whisper>
    );
  } else {
    roomChat = (
      <div className='room-chat'>
        <div className='room-chat-close-chat'>
          <div className='room-chat-close-button'>
            <Whisper
              trigger='hover'
              placement='left'
              speaker={<Tooltip>Close Chat</Tooltip>}
            >
              <img
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                src='/images/close_button_black.svg'
                alt=''
                onClick={() => setExpand((e) => !e)}
              />
            </Whisper>
          </div>
        </div>
        <ChatWindow title={'Room Chat'} socket={socket} />
        {
          // Yet to be implemented...
          // <ChatWindow title={'Team Chat'} socket={socket} />
        }
      </div>
    );
  }
  return <>{roomChat}</>;
}

export default RoomChat;
