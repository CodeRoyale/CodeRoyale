import React, { Component } from 'react';
import './FrontPageMain.css';
import Description from './Description';
import FrontPageNavBar from '../../components/frontPageNavBar/FrontPageNavBar';
import { Redirect } from 'react-router';

class FrontPageMain extends Component {
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
    if (this.state.loggedIn) {
      return <Redirect to='/dashboard' />;
    }
    return (
      <div data-testid='front-page' className='front-page'>
        <FrontPageNavBar />
        <Description />
      </div>
    );
  }
}

export default FrontPageMain;
