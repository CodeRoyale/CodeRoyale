import React, { useState } from 'react';
import './ArenaMain.css';
import { Input } from 'antd';

function Chat({ socket }) {
  const [state, setState] = useState({ message: '', name: 'userName' });

  const handleMessageChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  // When message is submitted to server
  const onMessageSubmit = (e) => {
    e.preventDefault();
    const { name, message } = state;
    console.log(message);
    console.log(socket);
    socket.emit('SEND_MSG', { content: message }, (data) => {
      console.log(data);
    });
    setState({ message: '', name });
  };

  return (
    <div className='chat-body'>
      <div className='chat-header'>CHAT</div>
      <div className='chat-container'>
        Messages sent here are displayed here
      </div>
      <form onSubmit={onMessageSubmit}>
        <div className='chat-input'>
          <Input
            name='message'
            value={state.message}
            onChange={handleMessageChange}
            placeholder='Type here'
          ></Input>
          <button>Send</button>
        </div>
      </form>
    </div>
  );
}

export default Chat;
