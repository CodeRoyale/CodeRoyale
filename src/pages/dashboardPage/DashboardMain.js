import React, { Component } from 'react';
import './DashboardMain.css';
import Button from '../../components/button/Button';
import NavBar from '../../components/navBar/NavBar';
import { Redirect } from 'react-router';

class DashboardMain extends Component {
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

  lobbyRedirect = () => {
    this.props.history.push({
      pathname: `/lobby`,
    });
  };

  render() {
    if (!this.state.loggedIn) {
      return <Redirect to='/' />;
    }
    return (
      <div data-testid='dashboard' className='dashboard'>
        <div data-testid='dashboard-header' className='dashboard-header'>
          <NavBar />
        </div>
        <div data-testid='dashboard-body' className='dashboard-body'>
          <div
            data-testid='dashboard-body-left'
            className='dashboard-body-left'
          >
            <div
              data-testid='dashboard-text-heading'
              className='dashboard-text-heading'
            >
              <b>
                Compete Your Coding Skills <br /> With Others
              </b>
            </div>
            <div
              data-testid='dashboard-play-body'
              className='dashboard-play-body'
            >
              <div
                data-testid='dashboard-play-friends'
                className='dashboard-play-friends'
              >
                <b>Play with a friend</b>
                <br />
                <span>
                  Invite a friend to a unique coding room to battle out your
                  competitive programming skills.
                </span>
                <br />
                <div
                  data-testid='dashboard-play-button'
                  className='dashboard-play-button'
                >
                  <Button
                    type='button'
                    onClick={this.lobbyRedirect}
                    buttonStyle='btn--primary--normal'
                    buttonSize='btn--large'
                  >
                    Play
                  </Button>
                </div>
              </div>
              <div
                data-testid='dashoard-play-random'
                className='dashboard-play-random'
              >
                <b>Play with a random coder</b>
                <br />
                <span>
                  Get mapped into a coding room with a random coder to battle
                  out your competitive programming skills.
                </span>
                <br />
                <div
                  data-testid='dashboard-play-button'
                  className='dashboard-play-button'
                >
                  <Button
                    type='button'
                    onClick={this.lobbyRedirect}
                    buttonStyle='btn--primary--normal'
                    buttonSize='btn--large'
                  >
                    Play
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div
            data-testid='dashboard-body-right'
            className='dashboard-body-right'
          >
            <img
              data-testid='dashboard-image'
              className='dashboard-image'
              src='/images/lobby_image.svg'
              alt=''
            />
          </div>
        </div>
        <div data-testid='dashboard-footer' className='dashboard-footer'></div>
      </div>
    );
  }
}

export default DashboardMain;
