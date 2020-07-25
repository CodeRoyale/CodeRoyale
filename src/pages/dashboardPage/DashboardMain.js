import React from 'react';
import './DashboardPage.css';
import DashboardNavBar from '../../components/dashboardNavBar/DashboardNavBar';
import Button from '../../components/button/Button';

function DashboardMain() {
  return (
    <div className='dashboard'>
      <div className='dashboard-header'>
        <DashboardNavBar />
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
              <div class='dashboard-play-button'>
                <Button
                  type='button'
                  buttonStyle='btn--primary--normal'
                  buttonSize='btn--large'
                >
                  Play
                </Button>
              </div>
            </div>
            <div className='dashboard-play-random'>
              <b>Play with a random coder</b>
              <br />
              <span>
                Get mapped into a coding room with a random coder to battle out
                your competitive programming skills.
              </span>
              <br />
              <div class='dashboard-play-button'>
                <Button
                  type='button'
                  buttonStyle='btn--primary--normal'
                  buttonSize='btn--large'
                >
                  Play
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className='dashboard-body-right'>
          <img
            className='dashboard-image'
            src='/images/lobby_image.svg'
            alt=''
          />
        </div>
      </div>
      <div className='dashboard-footer'></div>
    </div>
  );
}

export default DashboardMain;
