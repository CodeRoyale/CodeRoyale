import React from 'react';
import NavBar from '../../components/navBar/NavBar';
import './ArenaMain.css';
import Problem from './problem/Problem';
import Chat from './chat/Chat';
import Solution from './solution/Solution';
import Button from '../../components/button/Button';

function ArenaPage() {
  return (
    <div className='arena-page'>
      <div>
        <NavBar />
      </div>

      <div className='arena-body'>
        <div className='left-container'>
          <Problem />
          <Chat />
        </div>

        <div className='right-container'>
          <Solution />
          <div className='button-container'>
            <Button
              type='button'
              buttonStyle='btn--primary--normal'
              buttonSize='btn--medium'
            >
              SUBMIT
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArenaPage;
