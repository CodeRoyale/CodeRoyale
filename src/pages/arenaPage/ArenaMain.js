import React from 'react';
import NavBar from '../../components/navBar/NavBar';
import './ArenaMain.css';
import Problem from './Problem';
import Chat from './Chat';
import Solution from './Solution';

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
        </div>
      </div>
    </div>
  );
}

export default ArenaPage;
