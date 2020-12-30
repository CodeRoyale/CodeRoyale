import React, { useState, useEffect, useRef } from 'react';
import { InputGroup, Input, Icon } from 'rsuite';
import { connect } from 'react-redux';
import { sendMsg } from '../../actions/chatActions';

function RoomChat({ socketData, chatData, sendMsg }) {
  const socket = socketData.socket;
  const messageList = chatData.msgList;
  const messagesEndRef = useRef(null);
  const [state, setState] = useState({
    inputChat: '',
    sendClicked: false,
  });
  const { inputChat, sendClicked } = state;

  useEffect(() => {
    const message = inputChat;
    if (sendClicked) {
      sendMsg(socket, { message });
      setState({ ...state, inputChat: '', sendClicked: false });
    }
  }, [inputChat, sendClicked, sendMsg, socket, state]);

  // Display chats...
  let messages = null;
  if (messageList.length > 0) {
    // messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    messages = (
      <div>
        {messageList.map((data) => (
          <div key={data.id}>
            <b style={{ color: data.color }}>{data.source}</b>
            {': '}
            {data.message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    );
  }

  return (
    <div className='room-chat'>
      <div className='room-chat-title'>
        <img
          src='/images/chat.svg'
          alt=''
          style={{ width: '20px', height: '20px' }}
        />{' '}
        <b>Chat</b>
      </div>
      <div className='room-chat-chats'>{messages}</div>
      <div className='room-chat-input'>
        <InputGroup inside>
          <Input
            value={inputChat}
            placeholder='Enter a message...'
            onChange={(value, event) =>
              setState({ ...state, inputChat: value })
            }
          />
          <InputGroup.Button
            onClick={() => {
              setState({ ...state, sendClicked: true });
            }}
          >
            <Icon icon='send' />
          </InputGroup.Button>
        </InputGroup>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  socketData: state.socketData,
  chatData: state.chatData,
});

export default connect(mapStateToProps, { sendMsg })(RoomChat);
