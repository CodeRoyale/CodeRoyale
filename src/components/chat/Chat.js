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

  const test = {
    height: '158px',
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
    <div style={test} className='chat-container'>
      <div>{chatBubbles}</div>
      <InputGroup inside>
        <Input
          value={message}
          onChange={(value) => {
            setMessage(value);
          }}
          placeholder='Type a message to your team...'
          maxlength='50'
        />
        <InputGroup.Button onClick={() => sendMsg(socket, { message })}>
          <Icon icon='send' />
        </InputGroup.Button>
      </InputGroup>
    </div>
  );
};

const mapStateToProps = (state) => ({
  socketData: state.socketData,
  chatData: state.chatData,
});

export default connect(mapStateToProps, { sendMsg })(Chat);
