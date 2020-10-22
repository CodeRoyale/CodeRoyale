import React from 'react';
import './Chat.css';

const ChatBubble = ({ userImage, userName, userMessage, bubbleColor }) => {
  return (
    <div
      className='chat-bubble-container'
      style={{ 'background-color': bubbleColor }}
    >
      <img
        className='chat-bubble-user-profile-pic'
        alt='profile img'
        src='https://lh3.googleusercontent.com/a-/AOh14GgwJrwDUSd1-NB4BdMN4XLPj4b-80WgMpKxLuba2w=s96-c'
      />
      <div className='chat-bubble-message-container'>
        <div>
          <span className='chat-bubble-sender'>{userName}</span>
          <br />
          <span className='chat-bubble-chat-message'>{userMessage}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
