import React from 'react';
import NavBar from '../../components/navBar/NavBar';
import './ArenaMain.css';
import Problem from './Problem';
import Chat from './Chat';
import Solution from './Solution';
import { Redirect } from 'react-router';

const ArenaMain = (props) => {
  // Checking if the socket and room_id are not null...
  if (props.location.props === undefined) {
    return <Redirect to='/lobby' />;
  }

  const socket = props.location.props.socket;
  const accessToken = localStorage.getItem('access-token');
  if (accessToken === null) {
    return <Redirect to='/' />;
  }

  return (
    <div className='arena-page'>
      <div>
        <NavBar />
      </div>

      <div className='arena-body'>
        <div className='left-container'>
          <Problem />
          <Chat socket={socket} />
        </div>

        <div className='right-container'>
          <Solution />
        </div>
      </div>
    </div>
  );
};

export default ArenaMain;
