import React, { useState, useEffect } from 'react';
import './ArenaMain.css';
import { Input } from 'antd';

function Chat({ socket }) {
  const [state, setState] = useState({ message: '', name: 'User' });
  const [chat, setChat] = useState([]);

  const handleMessageChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();
    const { name, message } = state;
    console.log(message);
    console.log(socket);
    socket.emit('SEND_MSG', { message }, (data) => {
      console.log(data);
    });
    setState({ message: '', name });
  };

  const renderChat = () => {
    return chat.map((userName, message, index) => (
      <div key={index}>
        <h3>
          {userName}: <span>{message}</span>
        </h3>
      </div>
    ));
  };

  return (
    <div className='chat-body'>
      <div className='chat-header'>CHAT</div>
      <div className='chat-container'>{renderChat()}</div>
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
