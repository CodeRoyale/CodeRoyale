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
      <hr />
      <Chat style={{ height: '50%' }} restricted={true} />
    </div>
  );
};

export default VetoSideBar;
