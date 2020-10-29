import React from 'react';
import Chat from '../../components/chat/Chat';
import VetoStatus from './VetoStatus';
import './VetoMain.css';

const VetoSideBar = (props) => {
  return (
    <div className='veto-side-bar'>
      <div className='veto-side-bar-status'>
        <VetoStatus />
      </div>
      <hr />
      <div className='veto-side-bar-chat'>
        <p className='chat-head'>Team Chat</p>
        <Chat />
      </div>
    </div>
  );
};

export default VetoSideBar;
