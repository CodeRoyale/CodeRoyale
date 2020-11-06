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
        src={userImage}
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
