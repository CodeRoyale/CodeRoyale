/*
 * Team chat for members in a team
 */

import React, { useState } from 'react';
import ChatBubble from './ChatBubble';
import { Input, InputGroup, Icon } from 'rsuite';
import profileData from '../../utils/profileData';
import './Chat.css';

const TeamChat = (props) => {
  let chatBubbles = null;
  const [message, setMessage] = useState('');

  const teamMsgList = props.teamMsgList;

  const chatBubblesStyle = {
    height: '88%',
  };

  if (teamMsgList !== undefined) {
    chatBubbles = teamMsgList.map((item, index) => {
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
      <div style={chatBubblesStyle} className='chat-messages-container'>
        <div>{chatBubbles}</div>
      </div>
      <div className='chat-message-input'>
        <InputGroup inside>
          <Input
            value={message}
            onChange={(value) => {
              setMessage(value);
            }}
            onPressEnter={() => {
              props.sendTeamMsg(message);
              setMessage('');
            }}
            placeholder='Type a message...'
            maxlength='50'
          />
          <InputGroup.Button
            onClick={() => {
              props.sendTeamMsg(message);
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

export default TeamChat;
