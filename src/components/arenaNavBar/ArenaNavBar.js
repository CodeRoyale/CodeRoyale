import React from 'react';
import LogoContainer from '../logoContainer/LogoContainer';
import ProfileButton from '../profileButton/ProfileButton';
import './ArenaNavBar.css';

function ArenaNavBar() {
  const profileData = {
    imageUrl:
      'https://media-exp1.licdn.com/dms/image/C5103AQHuIxezqseoGQ/profile-displayphoto-shrink_200_200/0?e=1597276800&v=beta&t=tREaHG412Mr99Tfke80DMtuQtVQyB4378ptl3SlwDvI',
    username: 'Sawarni Swaroop',
    email: 'sawarni99@gmail.com',
  }; // Get this from API...;
  return (
    <div className='dashboard-nav-bar'>
      <div className='nav-bar-logo'>
        <LogoContainer />
      </div>
      <div className='nav-bar-profile'>
        <ProfileButton profileData={profileData} />
      </div>
    </div>
  );
}

export default ArenaNavBar;
