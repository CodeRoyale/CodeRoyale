import React, { useState } from 'react';
import './ProfileButton.css';
import { useHistory } from 'react-router-dom';
import Button from '../button/Button';

const ProfileButton = ({ profileData }) => {
  const history = useHistory();

  const imageUrl = profileData.picture;
  const firstName = profileData.firstName;
  const lastName = profileData.lastName;
  const username = profileData.userName;
  const email = profileData.email;

  const [profileClicked, setProfileClicked] = useState(false);
  const onClickProfileButton = () => {
    setProfileClicked(!profileClicked);
  };
  let profileMenuBar;

  const logoutUser = () => {
    console.log('user logout');
  };

  if (profileClicked) {
    profileMenuBar = (
      <div className='profile-menubar'>
        <img
          className='profile-menubar-profile-picture'
          src={imageUrl}
          alt='user-profile-pic'
          onClick={onClickProfileButton}
        />
        <br />
        <span className='profile-menubar-name'>
          {firstName + ' ' + lastName}
        </span>
        <br />
        <span className='profile-menubar-username'>{'@' + username}</span>
        <br />
        <span className='profile-menubar-email'>{email}</span>
        <br />
        <div className='profile-menubar-line'></div>
        <div className='profile-menubar-settings-button'>
          <Button
            type='button'
            onClick={() => history.push('/settings')}
            buttonStyle='btn--primary--normal'
            buttonSize='btn--medium'
          >
            Settings
          </Button>
        </div>
        <div className='profile-menubar-logout-button'>
          <Button
            type='button'
            buttonStyle='btn--primary--logout'
            buttonSize='btn--medium'
            onClick={logoutUser}
          >
            Log out
          </Button>
        </div>
      </div>
    );
  } else {
    profileMenuBar = null;
  }
  return (
    <div className='navbar-profile-button'>
      <img
        className='navbar-profile-image'
        src={imageUrl}
        alt='user-profile-pic'
        onClick={onClickProfileButton}
      />
      {profileMenuBar}
    </div>
  );
};

export default ProfileButton;
