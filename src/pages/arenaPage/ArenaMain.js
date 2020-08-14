import React from 'react';
import NavBar from '../../components/navBar/NavBar';
import './ArenaMain.css';
import Problem from './Problem';
import Chat from './Chat';
import Solution from './Solution';
import { Redirect } from 'react-router';

const ArenaMain = () => {
  const accessToken = () => {
    let ac = localStorage.getItem('access-token');
    if (ac === null) {
      return false;
    } else {
      return true;
    }
  };

  const isLoggedIn = accessToken ? true : false;

  let content = (
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

  if (!isLoggedIn) {
    content = <Redirect to='/' />;
  }

  return content;
};

export default ArenaMain;
