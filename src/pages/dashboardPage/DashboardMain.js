import React, { useState } from 'react';
import './DashboardMain.css';
import Button from '../../components/button/Button';
import NavBar from '../../components/navBar/NavBar';
import JoinRoomView from './JoinRoomView';
import CreateRoomView from './CreateRoomView';
// import { Redirect } from 'react-router';

const DashboardMain = () => {
  // TODO: Connect to socket...
  // const accessToken = localStorage.getItem('access-token');
  const [createRoomShow, setCreateRoomShow] = useState(false);

  // if (accessToken === null) {
  //   return <Redirect to='/' />;
  // }

  return (
    <div className='dashboard'>
      <div className='dashboard-header'>
        <NavBar />
      </div>
      <div className='dashboard-body'>
        <div className='dashboard-left'>
          <div>
            <div style={{ fontSize: '36px' }}>
              <b>
                Compete Your Coding Skills <br /> with Others
              </b>
            </div>

            <div
              style={{ fontSize: '16px', marginTop: '15px', color: '#5E5E5E' }}
            >
              Get mapped into a coding room with friends to <br /> battle out
              your competitive programming skills.
            </div>

            <div className='dashboard-left-input-container'>
              <div style={{ marginTop: '2px' }}>
                <Button
                  type='button'
                  onClick={() => setCreateRoomShow(true)}
                  buttonStyle='btn--primary--normal'
                  buttonSize='btn--medium'
                >
                  Create Room
                </Button>
              </div>
              <div>
                <JoinRoomView />
              </div>
            </div>
          </div>
        </div>

        <div className='dashboard-background'>
          <img src='/images/lobby_image.svg' alt='' />
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
            <path
              fill='#ffffff'
              fill-opacity='1'
              d='M0,320L48,309.3C96,299,192,277,288,256C384,235,480,213,576,176C672,139,768,85,864,58.7C960,32,1056,32,1152,58.7C1248,85,1344,139,1392,165.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
            ></path>
          </svg>
        </div>
      </div>
      <CreateRoomView show={createRoomShow} onClose={setCreateRoomShow} />
    </div>
  );
};

export default DashboardMain;
