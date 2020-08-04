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
      <div data-testid='arena-page' className='arena-page'>
        <div data-testid='arena-navbar'>
          <NavBar />
        </div>

        <div data-testid='arena-body' className='arena-body'>
          <div data-testid='left-container' className='left-container'>
            <Problem />
            <Chat />
          </div>

          <div data-testid='right-container' className='right-container'>
            <Solution />
          </div>
        </div>
      </div>
    );
  }
}

export default ArenaMain;
