import React, { useState, useEffect } from 'react';
import './ArenaMain.css';
import { Input } from 'rsuite';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../utils/mapStateToProps';
import { sendMsg } from '../../actions/chatActions';

function Chat({ sendMsg, socket, chatData }) {
  const [state, setState] = useState({
    message: '',
    sendMsgClick: false,
  });
  const { message, sendMsgClick } = state;
  const messageList = chatData.msgList;

  //const response= {"data":{"submissions":[{"language_id":70,"stdout":"YES\n","status_id":3,"stderr":null,"token":"8d787b3d-6f5b-457d-bc41-cc22b0e9b4a9"},{"language_id":70,"stdout":"NO\n","status_id":3,"stderr":null,"token":"6f92c14e-3294-4afc-84b0-937ba00b2726"},{"language_id":70,"stdout":"YES\n","status_id":3,"stderr":null,"token":"a7da4b63-31bf-495b-b2fc-73c9881c482b"},{"language_id":70,"stdout":"NO\n","status_id":3,"stderr":null,"token":"87b7c616-0197-4eb8-a536-f787870c34da"}]}}

  // useEffect(() => {
  //   if (sendMsgClick) {
  //     sendMsg(socket, { message });
  //     setState({ ...state, message: '', sendMsgClick: false });
  //   }
  // }, [socket, message, sendMsg, sendMsgClick, state]);

  useEffect(() => {
    socket.on('CODE_SUBMITTED', (data) => {
      console.log('code res:', data);
      console.log(JSON.stringify(data));
    });
  }, [socket]);

  return (
    <div className='chat-body'>
      <div className='chat-header'>CHAT</div>
      <div className='chat-container' id='chat-container'>
        <ul>
          {messageList.map((item) => (
            <li key={item.id}>
              <div className='chat-row'>
                <div style={{ color: item.color }}>
                  {item.source}
                  {' : '}
                </div>
                <div className='chat-spacing'></div>
                {item.message}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className='chat-input'>
        <Input
          value={state.message}
          onChange={(value) => {
            setState({ ...state, message: value });
          }}
          placeholder='Type here'
        ></Input>
        <button
          onClick={() => {
            setState({ ...state, sendMsgClick: true });
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, { sendMsg })(Chat);
