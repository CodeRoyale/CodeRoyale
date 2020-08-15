import React from 'react';
import './ArenaMain.css';
import { Input } from 'antd';
import Button from '../../components/button/Button';

function Chat() {
  return (
    <div className='chat-body'>
      <div className='chat-header'>CHAT</div>
      <div className='chat-container'>
        JOEL OP JOEL OP JOEL OP JOEL OP JOEL OP JOEL OP JOEL OP JOEL OP JOEL OP
        JOEL OP JOEL OP JOEL OP JOEL OP JOEL OP JOEL OP JOEL OP JOEL OP JOEL OP
        JOEL OP JOEL OP JOEL OP JOEL OP JOEL OP JOEL OP JOEL OP JOEL OP JOEL OP
        JOEL OP JOEL OP JOEL OP JOEL OP JOEL OP JOEL OP JOEL OP JOEL OP JOEL OP
        JOEL OP JOEL OP JOEL OP JOEL OP JOEL OP JOEL OP JOEL OP JOEL OP JOEL OP
        JOEL OP JOEL OP JOEL OP JOEL OP JOEL OP JOEL OP JOEL OP JOEL OP JOEL OP
        JOEL OP JOEL OP JOEL OP JOEL OP JOEL OP JOEL OP JOEL OP JOEL OP JOEL OP
        JOEL OP JOEL OP JOEL OP JOEL OP JOEL OP JOEL OP JOEL OP JOEL OP JOEL OP
        JOEL OP JOEL OP
      </div>
      <div className='chat-input'>
        <Input placeholder='Type here'></Input>
        <Button
          type='button'
          buttonStyle='btn--primary--normal'
          buttonSize='btn--medium'
          onClick={() => {
            console.log('Clicked');
          }}
        >
          SEND
        </Button>
      </div>
    </div>
  );
}

export default Chat;
