/*
 * Everyone chat, send message to everyone in room
 */

import React, { useState } from 'react';
import ChatBubble from './ChatBubble';
import { Input, InputGroup, Icon } from 'rsuite';
import profileData from '../../utils/profileData';
import './Chat.css';

const EveryoneChat = (props) => {
  let chatBubbles = null;
  const [message, setMessage] = useState('');

  const everyoneMsgList = props.everyoneMsgList;

  if (everyoneMsgList !== undefined) {
    chatBubbles = everyoneMsgList.map((item, index) => {
      return (
        <ChatBubble
          key={index}
          userName={item.source}
          userImage={
            item.source === 'You'
              ? profileData().picture
              : props.userProfilePictures[item.source]
          }
          userMessage={item.message}
          bubbleColor={index % 2 === 0 ? '#F0F0F0' : '#F9F9F9'}
        />
      );
    });
  }

  return (
    <div className='chat-container'>
      <div className='chat-messages-container'>
        <div>{chatBubbles}</div>
      </div>
      <div className='chat-input'>
        <InputGroup inside>
          <Input
            value={message}
            onChange={(value) => {
              setMessage(value);
            }}
            onPressEnter={() => {
              props.sendEveryoneMsg(message);
              setMessage('');
            }}
            placeholder='Type a message...'
            maxlength='50'
          />
          <InputGroup.Button
            onClick={() => {
              props.sendEveryoneMsg(message);
              setMessage('');
            }}
          >
            <Icon icon='send' />
          </InputGroup.Button>
        </InputGroup>
      </div>
    </div>
  );
};

export default EveryoneChat;