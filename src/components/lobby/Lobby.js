import React from 'react';
import './Lobby.css';
import LogoContainer from '../logoContainer/LogoContainer';
import ProfileButton from '../profileButton/ProfileButton';

function Lobby() {
  const profileData = {
    imageUrl:
      'https://media-exp1.licdn.com/dms/image/C5103AQHuIxezqseoGQ/profile-displayphoto-shrink_200_200/0?e=1597276800&v=beta&t=tREaHG412Mr99Tfke80DMtuQtVQyB4378ptl3SlwDvI',
    username: 'Sawarni Swaroop',
    email: 'sawarni99@gmail.com',
  }; // Get this from api...

  return (
    <div className='lobby'>
      <div className='lobby-header'>
        <div className='lobby-logo'>
          <LogoContainer />
        </div>
        <div className='lobby-profile'>
          <ProfileButton profileData={profileData} />
        </div>
      </div>
      <div className='lobby-body'></div>
      <div className='lobby-footer'></div>
    </div>
  );
}

export default Lobby;
