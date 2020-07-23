import React, { useState } from 'react';
import './ProfileButton.css';
import SignoutButton from '../signoutButton/SignoutButton';
import SettingsButton from '../settingsButton/SettingsButton';

function ProfileButton(props) {
  const profileData = props.profileData;
  const imageUrl = profileData.imageUrl;
  const email = profileData.email;
  const username = profileData.username;
  const [profileClicked, setProfileClicked] = useState(false);
  const onClickProfileButton = () => {
    setProfileClicked(!profileClicked);
  };
  let profileMenuBar;
  if (profileClicked) {
    profileMenuBar = (
      <div className='profile-menu-bar'>
        <b className='profile-menu-bar-username'>{username}</b>
        <br />
        <span className='profile-menu-bar-email'>{email}</span>
        <br />
        <div className='profile-menu-bar-line'></div>
        <div className='profile-menu-bar-settings-button'>
          <SettingsButton />
        </div>
        <div className='profile-menu-bar-signout-button'>
          <SignoutButton />
        </div>
      </div>
    );
  } else {
    profileMenuBar = null;
  }
  return (
    <div className='profile-button'>
      <img
        className='profile-image'
        src={imageUrl}
        alt=''
        onClick={onClickProfileButton}
      />
      {profileMenuBar}
    </div>
  );
}

export default ProfileButton;
