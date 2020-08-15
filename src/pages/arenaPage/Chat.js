import React, { useState } from 'react';
import './ArenaMain.css';
import { Input } from 'antd';
import Button from '../../components/button/Button';

function Chat() {
  const [message, setMessage] = useState('');

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleMessageSend = (e) => {
    console.log(message);
  };

  return (
    <div className='chat-body'>
      <div className='chat-header'>CHAT</div>
      <div className='chat-container'>
        <p>Messages here</p>
      </div>
      <div className='chat-input'>
        <Input onChange={handleMessageChange} placeholder='Type here'></Input>
        <Button
          type='button'
          buttonStyle='btn--primary--normal'
          buttonSize='btn--medium'
          onClick={handleMessageSend}
        >
          SEND
        </Button>
      </div>
    </div>
  );
}

export default Chat;
