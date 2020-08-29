import React from 'react';
import ChatWindow from './ChatWindow';

function RoomChat({ socket }) {
  return (
    <div className='room-chat'>
      <div>{/*TODO: Implement close room here.... */}</div>
      <ChatWindow title={'Room Chat'} socket={socket} />
      {
        // Yet to be implemented...
        // <ChatWindow title={'Team Chat'} socket={socket} />
      }
    </div>
  );
}

export default RoomChat;
