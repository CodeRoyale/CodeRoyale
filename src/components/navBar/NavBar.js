import React from 'react';
import LogoContainer from '../../components/logoContainer/LogoContainer';
import ProfileButton from '../../components/profileButton/ProfileButton';
import './NavBar.css';

function NavBar() {
  let profileData = localStorage.getItem('user-data');
  profileData = JSON.parse(profileData);
  return (
    <div data-testid='nav-bar' className='nav-bar'>
      <div data-testid='nav-bar-logo' className='nav-bar-logo'>
        <LogoContainer />
      </div>
      <div data-testid='nav-bar-profile' className='nav-bar-profile'>
        <ProfileButton profileData={profileData} />
      </div>
    </div>
  );
}

export default NavBar;
