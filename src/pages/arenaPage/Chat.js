import React, { useState, useEffect } from 'react';
import './ArenaMain.css';
import { Input } from 'antd';
import { v4 as uuidv4 } from 'uuid';

function Chat({ socket }) {
  const [state, setState] = useState({ message: '', name: 'userName' });
  const [messageList, setList] = useState([]);

  const handleMessageChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    socket.on('RCV_MSG', (data) => {
      console.log(data);
      console.log(data.content);
      const newList = messageList.concat({
        id: uuidv4(),
        source: data.userName + ': ',
        msg: data.content,
      });
      setList(newList);
    });
  }, [socket, messageList]);

  // When message is submitted to server
  const onMessageSubmit = (e) => {
    e.preventDefault();
    const { name, message } = state;

    const newList = messageList.concat({
      id: uuidv4(),
      source: 'You: ',
      msg: message,
    });
    setList(newList);

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
      <div className='chat-container'>
        <ul>
          {messageList.map((item) => (
            <li key={item.id}>
              {item.source}
              {item.msg}
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={onMessageSubmit}>
        <div className='chat-input'>
          <Input
            name='message'
            value={state.message}
            onChange={handleMessageChange}
            placeholder='Type here'
          ></Input>
          <button>Send</button>
        </div>
      </form>
    </div>
  );
}

export default Chat;
