/*
    For the header of website...
*/

import React, { Component } from 'react';
import Button from '../../components/button/Button';
import Modal from 'react-modal';
import GoogleSignIn from '../../components/googleSignIn/GoogleSignIn';
import LogoContainer from '../../components/logoContainer/LogoContainer';
import './Header.css';

Modal.setAppElement('#root');

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  render() {
    let heightOffset = 350 / 2;
    let offsetPx = heightOffset + 'px';
    return (
      <div className='header-container'>
        <LogoContainer />
        <div className='header-links'></div>
        <div
          className='header-sign-in'
          onClick={(e) => this.setState({ isOpen: true })}
        >
          <Button text='sign in' href='#' />
        </div>
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={(e) => this.setState({ isOpen: false })}
          style={{
            overlay: {
              backgroundColor: 'grey',
            },
            content: {
              border: '0',
              borderRadius: '4px',
              bottom: 'auto',
              height: '350px', // set height
              left: '50%',
              padding: '2rem',
              position: 'fixed',
              right: 'auto',
              top: '50%', // start from center
              transform: 'translate(-50%,-' + offsetPx + ')', // adjust top "up" based on height
              width: '30%',
              maxWidth: '40rem',
            },
          }}
        >
          <h2>Sign in to CodeRoyale</h2>
          <p className='popup-close-para'>
            You need to make an account to use CodeRoyale
          </p>
          <GoogleSignIn />
          <button
            className='popup-close-button'
            onClick={(e) => this.setState({ isOpen: false })}
          >
            Close
          </button>
        </Modal>
      </div>
    );
  }
}

export default Header;
