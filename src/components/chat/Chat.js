import React from 'react';
import ChatBubble from './ChatBubble';
import { Input, InputGroup, Icon } from 'rsuite';
import './Chat.css';

const Chat = () => {
  let chatBubbles = null;
  const chatList = [
    {
      userName: 'mayur',
      userMessage: 'yoyoyoyoyo',
    },
    {
      userName: 'joel',
      userMessage: 'hi bro wassup',
    },
    {
      userName: 'alan',
      userMessage: 'hi bro wassup, how rur ',
    },
    {
      userName: 'mayur',
      userMessage: 'yoyoyoyoyo',
    },
  ];

  if (chatList !== undefined) {
    chatBubbles = chatList.map((item, index) => {
      return (
        <ChatBubble
          key={index}
          userName={item.userName}
          userMessage={item.userMessage}
          bubbleColor={index % 2 === 0 ? '#F0F0F0' : '#F9F9F9'}
        />
      );
    });
  }

  return (
    <div>
      {chatBubbles}
      <InputGroup inside>
        <Input placeholder='Type a message to your team...' maxlength='50' />
        <InputGroup.Button>
          <Icon icon='send' />
        </InputGroup.Button>
      </InputGroup>
    </div>
  );
};

export default Chat;
