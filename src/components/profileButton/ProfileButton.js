import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser, actionReset } from '../../actions/userActions';
import { LOGOUT, ERROR } from '../../utils/constants';
import { Alert } from 'rsuite';
import Button from '../button/Button';
import './ProfileButton.css';

const ProfileButton = ({ userData, profileData, logoutUser }) => {
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

  // Showing error alert
  const errorAlert = (message) => {
    Alert.error(message);
  };

  const handleLogoutUser = () => {
    logoutUser();
  };

  // Message to user when logout unsuccessfull
  useEffect(() => {
    if (userData.logoutData.error) {
      switch (userData.logoutData.error) {
        case ERROR:
          errorAlert("Couldn't logout, please try again later!");
          actionReset();
          break;
        default:
          errorAlert("Couldn't logout, please try again later!");
          actionReset();
          break;
      }
    }
  }, [userData.logoutData.error]);

  // Message to user when logout successfull
  useEffect(() => {
    if (userData.logoutData.data) {
      if (userData.logoutData.data.payload.message === LOGOUT) {
        actionReset();
        history.push('/');
      }
    }
  }, [userData.logoutData.data, history]);

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
            onClick={handleLogoutUser}
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

const mapStateToProps = (state) => ({
  userData: state.userData,
});

export default connect(mapStateToProps, {
  logoutUser,
  actionReset,
})(ProfileButton);
