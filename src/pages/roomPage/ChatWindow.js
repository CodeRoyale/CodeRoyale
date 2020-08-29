import React, { useState, useEffect, useRef } from 'react';
import { InputGroup, Input, Icon } from 'rsuite';

function ChatWindow({ title, socket }) {
  const [state, setState] = useState({
    inputChat: '',
    sendClicked: false,
    messageList: [],
  });
  const messagesEndRef = useRef(null);
  const { inputChat, sendClicked, messageList } = state;
  let messages = null;

  // Receiving Message...
  useEffect(() => {
    if (socket !== null) {
      socket.on('RCV_MSG', (data) => {
        if (data !== null) {
          let message = {
            id: messageList.length,
            source: data.userName,
            message: data.content,
            color: 'red',
          };
          const newList = messageList.concat(message);
          setState({ ...state, messageList: newList, sendClicked: false });
        }
      });
    }
  });

  // Sending message....
  useEffect(() => {
    if (sendClicked && inputChat !== '' && socket !== null) {
      socket.emit('SEND_MSG', { content: inputChat }, (data) => {
        if (data) {
          let message = {
            id: messageList.length,
            source: 'You',
            message: inputChat,
            color: 'green',
          };
          const newList = messageList.concat(message);
          setState({
            ...state,
            sendClicked: false,
            inputChat: '',
            messageList: newList,
          });
        }
      });
    }
  });

  // Making scrollbar to point to latest message....
  useEffect(() => {
    if (messageList.length > 0)
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messageList, messagesEndRef]);

  if (messageList.length > 0) {
    messages = (
      <div>
        {messageList.map((data) => (
          <div key={data.id}>
            <span style={{ color: data.color }}>{data.source}</span> :{' '}
            {data.message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    );
  }

  return (
    <div className='chat-window'>
      <div className='chat-title'>
        <b>{title}</b>
      </div>
      <div className='chat-window-chats-container'>{messages}</div>
      <div className='chat-window-input-container'>
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

export default ChatWindow;
