import React, { Component } from 'react';
import ShareLinkCardFriend from './ShareLinkCardFriend';
import './LobbyMain.css';
import NavBar from '../../components/navBar/NavBar';
import { Redirect } from 'react-router';
import profileData from '../../utils/examples';

class LobbyMain extends Component {
  constructor(props) {
    super(props);
    const accessToken = localStorage.getItem('access-token');
    let loggedIn = true;
    if (accessToken === null) {
      loggedIn = false;
    }
    this.state = {
      profileData,
      loggedIn,
    };
  }

  render() {
    if (!this.state.loggedIn) {
      return <Redirect to='/' />;
    }
    return (
      <div className='lobby'>
        <div className='lobby-header'>
          <NavBar />
        </div>
        <div className='lobby-body'>
          <ShareLinkCardFriend
            profileData={this.state.profileData}
            sharableLink='Share this link'
          />
        </div>
      </div>
    );
  }
}

export default LobbyMain;
