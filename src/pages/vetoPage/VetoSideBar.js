import React from 'react';
import Chat from '../../components/chat/Chat';
import VetoStatus from './VetoStatus';
import './VetoMain.css';

const VetoSideBar = ({ vetoUsers, vetoCompletedUsers }) => {
  return (
    <div className='veto-side-bar'>
      <VetoStatus
        vetoUsers={vetoUsers}
        vetoCompletedUsers={vetoCompletedUsers}
      />
      <div>
        <Chat
          style={{ height: '44%', position: 'absolute' }}
          restricted={true}
        />
      </div>
    </div>
  );
};

export default VetoSideBar;
