import React from 'react';
import LogoContainer from '../../components/logoContainer/LogoContainer';
import ProfileButton from '../../components/profileButton/ProfileButton';
import './DashboardNavBar.css';

function DashboardNavBar(props) {
  const profileData = props.profileData;
  return (
    <div className='dashboard-nav-bar'>
      <div className='lobby-logo'>
        <LogoContainer />
      </div>
      <div className='lobby-profile'>
        <ProfileButton profileData={profileData} />
      </div>
    </div>
  );
}

export default DashboardNavBar;
