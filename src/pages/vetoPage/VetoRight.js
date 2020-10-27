import React from 'react';
import Chat from '../../components/chat/Chat';
import Button from '../../components/button/Button';
import './VetoMain.css';

const VetoRight = (props) => {
  return (
    <div>
      <div className='veto-right-status'>
        <h2>joel</h2>
      </div>
      <div className='veto-right-chat'>
        <Chat />
      </div>
      <div className='veto-right-confirm-veto-votes'>
        <Button
          type='button'
          buttonStyle='btn--primary--normal'
          buttonSize='btn--medium'
          onClick={() => {
            props.confirmVetoVotes();
          }}
        >
          Confirm Veto
        </Button>
      </div>
    </div>
  );
};

export default VetoRight;
