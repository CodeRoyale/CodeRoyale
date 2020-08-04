import React, { useState } from 'react';
import './ProfileButton.css';
import { useHistory } from 'react-router-dom';
import Button from '../button/Button';

function ProfileButton(props) {
  // Redirect to /login
  const history = useHistory();
  const settingsRedirect = () => {
    let path = `settings`;
    history.push(path);
  };

  const imageUrl = props.profileData.picture;
  const email = props.profileData.email;
  const username = props.profileData.userName;
  const [profileClicked, setProfileClicked] = useState(false);
  const onClickProfileButton = () => {
    setProfileClicked(!profileClicked);
  };
  let profileMenuBar;

  const signOutUser = () => {
    // TODO: Call logout api
    localStorage.removeItem('access-token');
    localStorage.removeItem('user-data');
    // Redirect to '/sorry'
    let path = `sorry`;
    history.push(path);
  };

  if (profileClicked) {
    profileMenuBar = (
      <div data-testid='profile-menu-bar' className='profile-menu-bar'>
        <b
          data-testid='profile-menu-bar-username'
          className='profile-menu-bar-username'
        >
          {username}
        </b>
        <br />
        <span
          data-testid='profile-menu-bar-email'
          className='profile-menu-bar-email'
        >
          {email}
        </span>
        <br />
        <div
          data-testid='profile-menu-bar-line'
          className='profile-menu-bar-line'
        ></div>
        <div
          data-testid='profile-menu-bar-settings-button'
          className='profile-menu-bar-settings-button'
        >
          <Button
            type='button'
            onClick={settingsRedirect}
            buttonStyle='btn--primary--normal'
            buttonSize='btn--medium'
          >
            Edit Settings
          </Button>
        </div>
        <div
          data-testid='proofile-menu-bar-signout-button'
          className='profile-menu-bar-signout-button'
        >
          <Button
            type='button'
            buttonStyle='btn--primary--logout'
            buttonSize='btn--medium'
            onClick={signOutUser}
          >
            Sign out
          </Button>
        </div>
      </div>
    );
  } else {
    profileMenuBar = null;
  }
  return (
    <div data-testid='profile-button' className='profile-button'>
      <img
        data-testid='profile-image'
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
