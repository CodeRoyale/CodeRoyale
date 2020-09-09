import React from 'react';
import NavBar from '../../components/navBar/NavBar';
import './ArenaMain.css';
import Problem from './Problem';
import Chat from './Chat';
import Solution from './Solution';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../utils/mapStateToProps';

const ArenaMain = ({ socketData }) => {
  const socket = socketData.socket;

  if (socket === null) {
    return <Redirect to='/lobby' />;
  }

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
          <Solution socket={socket} />
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, null)(ArenaMain);
