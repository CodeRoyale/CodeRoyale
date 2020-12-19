import React from 'react';
import { useHistory } from 'react-router-dom';
import LogoContainer from '../../components/logoContainer/LogoContainer';
import ProfileButton from '../../components/profileButton/ProfileButton';
import Button from '../button/Button';
import profileData from '../../utils/profileData';
import './NavBar.css';

const NavBar = ({ loggedIn }) => {
  const history = useHistory();

  // Default navBar (loggedIn)
  let content = (
    <div className='nav-bar'>
      <div className='nav-bar-logo'>
        <LogoContainer />
      </div>
      <div className='nav-bar-profile'>
        <ProfileButton profileData={profileData()} />
      </div>
    </div>
  );

  // If user is not loggedIn
  if (!loggedIn) {
    content = (
      <div className='loggedOut-navbar'>
        <LogoContainer />
        <div className='loggedOut-nav-auth-container'>
          <div
            className='loggedOut-nav-signup'
            onClick={() => {
              history.push('/signup');
            }}
          >
            Sign up
          </div>
          <Button
            type='button'
            onClick={() => history.push('/login')}
            buttonStyle='btn--primary--signin'
            buttonSize='btn--small'
          >
            Login
          </Button>
        </div>
      </div>
    );
  }

  return content;
};

export default NavBar;
