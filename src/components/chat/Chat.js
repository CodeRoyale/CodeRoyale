import React, { useState } from 'react';
import ChatBubble from './ChatBubble';
import { Input, InputGroup, Icon } from 'rsuite';
import { connect } from 'react-redux';
import { sendMsg } from '../../actions/chatActions';
import './Chat.css';

const Chat = ({ socketData, chatData, sendMsg }) => {
  let chatBubbles = null;
  const socket = socketData.socket;
  const [message, setMessage] = useState('');

  const chatList = chatData.msgList;

  const chatBubblesStyle = {
    height: '88%',
  };

  if (chatList !== undefined) {
    chatBubbles = chatList.map((item, index) => {
      return (
        <ChatBubble
          key={index}
          userName={item.source}
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
              sendMsg(socket, { message });
              setMessage('');
            }}
            placeholder='Type a message to your team...'
            maxlength='50'
          />
          <InputGroup.Button
            onClick={() => {
              sendMsg(socket, { message });
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

const mapStateToProps = (state) => ({
  socketData: state.socketData,
  chatData: state.chatData,
});

export default connect(mapStateToProps, { sendMsg })(Chat);
