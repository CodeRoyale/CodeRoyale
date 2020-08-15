import React, { useState, useEffect } from 'react';
import './ArenaMain.css';
import { Input } from 'antd';
import Button from '../../components/button/Button';

function Chat(props) {
  const [message, setMessage] = useState('');
  const [generateClick, setGenerateClick] = useState(false);
  const socket = props.location.props.socket;

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleMessageSend = (e) => {
    setGenerateClick(true);
    console.log(message);
  };

  useEffect(() => {
    if (generateClick && message != null) {
      //emit
      // socket.emit('SEND_MSG', { message }, (data) => {
      //   console.log(data);
      // });
      setGenerateClick(false);
    }
  }, [generateClick, message, socket]);

  return (
    <div className='chat-body'>
      <div className='chat-header'>CHAT</div>
      <div className='chat-container'>
        <p>joelmathew99: Message i sent</p>
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
