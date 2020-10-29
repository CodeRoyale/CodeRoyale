import React from 'react';
import VetoPlayerStatusCard from '../../components/vetoPlayerStatusCard/VetoPlayerStatusCard';
import './VetoMain.css';

const VetoStatus = () => {
  return (
    <div className='veto-status'>
      <p className='veto-status-head'>Veto Status</p>
      <VetoPlayerStatusCard userName='alanhenry' userVoted={true} />
      <VetoPlayerStatusCard userName='joelmathew' userVoted={false} />
    </div>
  );
};

export default VetoStatus;
