import React from 'react';
import Chat from '../../components/chat/Chat';
import VetoStatus from './VetoStatus';
import './VetoMain.css';

const VetoSideBar = (props) => {
  return (
    <div className='veto-side-bar'>
      <VetoStatus
        vetoUsers={props.vetoUsers}
        vetoCompletedUsers={props.vetoCompletedUsers}
      />
      <hr />
      <p className='chat-head'>Team Chat</p>
      <Chat />
    </div>
  );
};

export default VetoSideBar;
