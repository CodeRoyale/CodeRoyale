import React from 'react';
import { Button } from 'rsuite';
import Timer from '../../components/timer/Timer';
import './VetoMain.css';

const VetoTopBar = (props) => {
  return (
    <div className='veto-top-bar'>
      <div className='veto-top-bar-timer'>
        <p className='veto-top-bar-timer-head'>Veto Time Left</p>
        <Timer milliseconds={props.vetoTime} />
      </div>
      <div className='veto-top-bar-divider'></div>
      <div className='veto-top-bar-confirm-veto-button'>
        <Button
          size='sm'
          onClick={() => {
            props.confirmVetoVotes();
          }}
          appearance='primary'
        >
          Confirm Veto
        </Button>
      </div>
    </div>
  );
};

export default VetoTopBar;
