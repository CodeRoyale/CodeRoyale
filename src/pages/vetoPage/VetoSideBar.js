import React from 'react';
import Chat from '../../components/chat/Chat';
import './VetoMain.css';

const VetoSideBar = (props) => {
  return (
    <div className='veto-side-bar'>
      <div className='veto-side-bar-status'>
        <h2>joel</h2>
      </div>
      <div className='veto-side-bar-chat'>
        <Chat />
      </div>
    </div>
  );
};

export default VetoSideBar;
