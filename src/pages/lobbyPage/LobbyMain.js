import React, { Component } from 'react';
import ShareLinkCardFriend from './ShareLinkCardFriend';
import './LobbyMain.css';
import NavBar from '../../components/navBar/NavBar';
import { Redirect } from 'react-router';

class LobbyMain extends Component {
  constructor(props) {
    super(props);
    let profileData = {
      imageUrl:
        'https://media-exp1.licdn.com/dms/image/C5103AQHuIxezqseoGQ/profile-displayphoto-shrink_200_200/0?e=1597276800&v=beta&t=tREaHG412Mr99Tfke80DMtuQtVQyB4378ptl3SlwDvI',
      username: 'baal',
      email: 'sawarni99@gmail.com',
    };
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
