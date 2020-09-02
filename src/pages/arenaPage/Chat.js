import React, { useState, useEffect } from 'react';
import './ArenaMain.css';
import { Input } from 'rsuite';
import { v4 as uuidv4 } from 'uuid';

function Chat({ socket }) {
  const [state, setState] = useState({ message: '', name: 'userName' });
  const [messageList, setMsgList] = useState([]);

  useEffect(() => {
    socket.on('RCV_MSG', (data) => {
      const newList = messageList.concat({
        id: uuidv4(),
        source: data.userName + ':  ',
        msg: data.content,
        color: 'red',
      });
      setMsgList(newList);
    });
  }, [socket, messageList]);

  // When message is submitted to server
  const onMessageSubmit = (e) => {
    e.preventDefault();
    const { name, message } = state;

    const newList = messageList.concat({
      id: uuidv4(),
      source: 'You:  ',
      msg: message,
      color: 'green',
    });
    setMsgList(newList);

    console.log(message);
    console.log(socket);
    socket.emit('SEND_MSG', { content: message }, (data) => {
      console.log(data);
    });
    setState({ message: '', name });
  };

  return (
    <div className='chat-body'>
      <div className='chat-header'>CHAT</div>
      <div className='chat-container' id='chat-container'>
        <ul>
          {messageList.map((item) => (
            <li key={item.id}>
              <div className='chat-row'>
                <div style={{ color: item.color }}>{item.source}</div>
                <div className='chat-spacing'></div>
                {item.msg}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={onMessageSubmit}>
        <div className='chat-input'>
          <Input
            value={state.message}
            onChange={(value) => {
              setState({ ...state, message: value });
            }}
            placeholder='Type here'
          ></Input>
          <button>Send</button>
        </div>
      </form>
    </div>
  );
}

export default Chat;
