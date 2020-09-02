import React, { useState, useEffect, useRef } from 'react';
import { InputGroup, Input, Icon } from 'rsuite';
//import ChatMessageDisplay from '../../components/chatMessageDisplay/ChatMessageDisplay';
// import Divider from '../../components/divider/Divider';

function RoomChat({ socket }) {
  const [state, setState] = useState({
    inputChat: '',
    sendClicked: false,
    messageList: [],
    msgReceivedListener: false,
  });
  const messagesEndRef = useRef(null);
  const { inputChat, sendClicked, messageList } = state;
  let messages = null;
  // // Sample...
  // const messageList = [
  //   { id: 0, source: 'You', message: 'hii', color: 'green' },
  //   {
  //     id: 1,
  //     source: 'Mayur',
  //     message: 'hello, How are you ? ',
  //     color: 'green',
  //   },
  //   {
  //     id: 2,
  //     source: 'Anugya',
  //     message: 'I am fine.',
  //     color: 'green',
  //   },
  //   {
  //     id: 3,
  //     source: 'You',
  //     message: 'Wow... Nice !!!',
  //     color: 'green',
  //   },
  // ];

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
          const newList = state.messageList.concat(message);
          setState({
            ...state,
            messageList: newList,
            sendClicked: false,
            msgReceivedListener: true,
          });
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

export default RoomChat;
