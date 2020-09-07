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

  useEffect(() => {
    if (sendMsgClick) {
      sendMsg(socket, { message });
      setState({ ...state, message: '', sendMsgClick: false });
    }
  }, [socket, message, sendMsg, sendMsgClick, state]);

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

const mapDispatchToProps = (dispatch) => {
  return {
    sendMsg: (socket, { message }) => {
      dispatch(sendMsg(socket, { message }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
