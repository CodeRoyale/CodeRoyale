import React, { Component } from 'react';
import './ProfileSettingsMain.css';
import SettingsBody from './SettingsBody';
import NavBar from '../../components/navBar/NavBar';
import { Redirect } from 'react-router-dom';

class ProfileSettingsMain extends Component {
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
      <div data-test='profile-settings' className='profile-settings'>
        <NavBar />
        <div
          data-test='settings-body-container'
          className='settings-body-container'
        >
          <SettingsBody />
        </div>
      </div>
    );
  }
}

export default ProfileSettingsMain;
