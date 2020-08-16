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

    /****************************************/
    /*This is only for testing...*/
    let socket = null;
    if (this.props.location.props !== undefined) {
      socket = this.props.location.props.socket;
    }
    /****************************************/
    let loggedIn = true;
    if (accessToken === null) {
      loggedIn = false;
    }
    this.state = {
      loggedIn,
      socket,
    };
  }
  render() {
    /*************************************/
    if (this.state.socket === null) {
      return <Redirect to='/lobby' />;
    }
    /*************************************/

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
            <Chat socket={this.state.socket} />
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
