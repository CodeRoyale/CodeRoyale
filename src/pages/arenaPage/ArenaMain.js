import React, { Component } from 'react';
import NavBar from '../../components/navBar/NavBar';
import './ArenaMain.css';
import Problem from './Problem';
import Chat from './Chat';
import Solution from './Solution';
import { Redirect } from 'react-router';

class ArenaMain extends Component {
  constructor(props) {
    super(props);
    const accessToken = localStorage.getItem('access-token');
    let loggedIn = true;
    if (accessToken === null) {
      loggedIn = false;
    }
    this.state = {
      loggedIn,
    };
  }
  render() {
    if (!this.state.loggedIn) {
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
            <Chat />
          </div>

          <div className='right-container'>
            <Solution />
          </div>
        </div>
      </div>
    );
  }
}

export default ArenaMain;
