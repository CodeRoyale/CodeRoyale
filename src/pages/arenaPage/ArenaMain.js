import React from 'react';
import ArenaNavBar from '../../components/arenaNavBar/ArenaNavBar';
import './ArenaMain.css';
import Problem from './problem/Problem';
import Chat from './chat/Chat';
import Solution from './solution/Solution';

function ArenaPage() {
  return (
    <div className='arena-page'>
      <div>
        <ArenaNavBar />
      </div>

      <div className='arena-body'>
        <div className='left-container'>
          <Problem />
          <Chat />
        </div>
        <div className='right-container'>
          <Solution />
        </div>
      </div>
    </div>
  );
}

export default ArenaPage;
