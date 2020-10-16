import React from 'react';
import { useHistory } from 'react-router-dom';
import LogoContainer from '../../components/logoContainer/LogoContainer';
import ProfileButton from '../../components/profileButton/ProfileButton';
import Button from '../button/Button';
import './NavBar.css';

const NavBar = ({ loggedIn }) => {
  const history = useHistory();

  let profileData = localStorage.getItem('user-data');
  profileData = JSON.parse(profileData);

  // Default navBar (loggedIn)
  let content = (
    <div className='nav-bar'>
      <div className='nav-bar-logo'>
        <LogoContainer />
      </div>
      <div className='nav-bar-profile'>
        <ProfileButton profileData={profileData} />
      </div>
    </div>
  );

  // If user is not loggedIn
  if (!loggedIn) {
    content = (
      <div className='loggedOut-navbar'>
        <header className='loggedOut-navbar-header'>
          <LogoContainer />
          <nav>
            <ul className='loggedOut-navlinks'>
              <li>
                <a href='https://github.com/CodeRoyale/codeRoyale-frontend/'>
                  About
                </a>
              </li>
              <li>
                <a href='https://github.com/CodeRoyale/codeRoyale-frontend/'>
                  FAQ
                </a>
              </li>
            </ul>
          </nav>
          <div>
            <a className='loggedOut-nav-signup' href='/signup'>
              Sign up
            </a>
            <Button
              type='button'
              onClick={() => history.push('/login')}
              buttonStyle='btn--primary--signin'
              buttonSize='btn--small'
            >
              Login
            </Button>
          </div>
        </header>
      </div>
    );
  }

  return content;
};

export default NavBar;
