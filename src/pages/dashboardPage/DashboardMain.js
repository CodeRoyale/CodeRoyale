import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { connectSocket } from '../../actions/socketActions';
import { preCheckUser, userActionReset } from '../../actions/userActions';
import Button from '../../components/button/Button';
import NavBar from '../../components/navBar/NavBar';
import JoinRoomView from './JoinRoomView';
import CreateRoomView from './CreateRoomView';
import { useHistory } from 'react-router-dom';
import { Alert, Loader } from 'rsuite';
import './DashboardMain.css';
import { PRECHECK_SUCCESS } from '../../actions/types';

const DashboardMain = ({
  connectSocket,
  userData,
  preCheckUser,
  userActionReset,
  roomData,
}) => {
  const history = useHistory();
  const [createRoomShow, setCreateRoomShow] = useState(false);

  // For checking if user token is validated by server
  useEffect(() => {
    preCheckUser(history);
  }, [preCheckUser, history]);

  // Showing error alert
  const errorAlert = (message) => {
    Alert.error(message);
  };

  // PreCheck error handling
  useEffect(() => {
    if (
      userData.preCheckData.error &&
      userData.preCheckData.error.payload === undefined
    ) {
      errorAlert(userData.preCheckData.error);
      localStorage.removeItem('token');
      history.push('/login');
      userActionReset();
    }
  }, [userData.preCheckData.error, userActionReset, history]);

  useEffect(() => {
    if (
      userData.preCheckData.type &&
      userData.preCheckData.type === PRECHECK_SUCCESS
    ) {
      connectSocket();
    }
  }, [connectSocket, userData]);

  // Checking for refresh...
  if (roomData.data !== null) {
    if (roomData.data.competition.veto.vetoOn) {
      history.push('/veto');
    } else if (roomData.data.competition.contestOn) {
      history.push('/arena');
    } else {
      history.push('/room');
    }
  }

  let content = (
    <div className='dashboard-page'>
      <NavBar loggedIn={true} />
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
              d='M0,320L48,309.3C96,299,192,277,288,256C384,235,480,213,576,176C672,139,768,85,864,58.7C960,32,1056,32,1152,58.7C1248,85,1344,139,1392,165.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
            ></path>
          </svg>
        </div>
      </div>
      <CreateRoomView show={createRoomShow} onClose={setCreateRoomShow} />
    </div>
  );

  // Pre-check running
  if (userData.preCheckData.isLoading) {
    content = (
      <div className='dashboard-page-precheck-loading'>
        <Loader size='sm' content='Loading...' />
      </div>
    );
  }

  return content;
};

const mapStateToProps = (state) => ({
  socketData: state.socketData,
  userData: state.userData,
  roomData: state.roomData,
});

export default connect(mapStateToProps, {
  connectSocket,
  preCheckUser,
  userActionReset,
})(DashboardMain);
