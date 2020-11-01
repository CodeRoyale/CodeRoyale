import React from 'react';
import VetoPlayerStatusCard from '../../components/vetoPlayerStatusCard/VetoPlayerStatusCard';
import './VetoMain.css';

const VetoStatus = ({ vetoUsers, vetoCompletedUsers }) => {
  let statusCards = null;

  if (vetoUsers !== undefined && vetoCompletedUsers !== undefined) {
    statusCards = vetoUsers.map((item, index) => {
      return (
        <VetoPlayerStatusCard
          key={index}
          userName={item.userName}
          team={item.team}
          userVoted={vetoCompletedUsers.includes(item.userName)}
        />
      );
    });
  }

  return (
    <div className='veto-status'>
      <p className='veto-status-head'>Veto Status</p>
      {statusCards}
    </div>
  );
};

export default VetoStatus;
