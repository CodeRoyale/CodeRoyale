import React from 'react';
import './DashboardPage.css';
import dashboard_image from '../../components/assets/images/lobby_image.svg';
import DashboardNavBar from '../../components/dashboardNavBar/DashboardNavBar';
import PlayButton from '../../components/playButton/PlayButton';

function DashboardMain() {
  const profileData = {
    imageUrl:
      'https://media-exp1.licdn.com/dms/image/C5103AQHuIxezqseoGQ/profile-displayphoto-shrink_200_200/0?e=1597276800&v=beta&t=tREaHG412Mr99Tfke80DMtuQtVQyB4378ptl3SlwDvI',
    username: 'Sawarni Swaroop',
    email: 'sawarni99@gmail.com',
  }; // Get this from API...

  return (
    <div className='dashboard'>
      <div className='dashboard-header'>
        <DashboardNavBar profileData={profileData} />
      </div>
      <div className='dashboard-body'>
        <div className='dashboard-body-left'>
          <div className='dashboard-text-heading'>
            <b>
              Compete Your Coding Skills <br /> With Others
            </b>
          </div>
          <div className='dashboard-play-body'>
            <div className='dashboard-play-friends'>
              <b>Play with a friend</b>
              <br />
              <span>
                Invite a friend to a unique coding room to battle out your
                competitive programming skills.
              </span>
              <br />
              <PlayButton />
            </div>
            <div className='dashboard-play-random'>
              <b>Play with a random coder</b>
              <br />
              <span>
                Get mapped into a coding room with a random coder to battle out
                your competitive programming skills.
              </span>
              <br />
              <PlayButton />
            </div>
          </div>
        </div>
        <div className='dashboard-body-right'>
          <img className='dashboard-image' src={dashboard_image} alt='' />
        </div>
      </div>
      <div className='dashboard-footer'></div>
    </div>
  );
}

export default DashboardMain;
