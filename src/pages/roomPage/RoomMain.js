import React, { useEffect, useState } from 'react';
import './RoomMain.css';
import { Redirect } from 'react-router';
import NavBar from '../../components/navBar/NavBar';
import CreateTeamView from './CreateTeamView';
import TeamCard from './TeamCard';
import CopyRoomCodeView from './CopyRoomCodeView';
import RoomDetails from './RoomDetails';
import CloseRoomView from './CloseRoomView';
import StartCompetitionButton from './StartCompetitionButton';
import ERROR_MSG from '../../utils/constants';

const RoomMain = (props) => {
  // TODO: Have to implement, what happens if the user goes to create page again....
  let room_id = null;
  let roomTeams = null;
  let roomConfig = null;
  let roomState = null;
  let socket = null;

  // const [teamCreated, setTeamCreated] = useState(false);
  const [state, setState] = useState({
    action: null,
    team_name: null,
    actionDone: false,
    roomData: null,
  });

  // Actions in the room...
  useEffect(() => {
    if (state.action !== null) {
      let team_name = null;
      if (state.action === 'CREATE_TEAM' || state.action === 'JOIN_TEAM') {
        team_name = state.team_name;
      } else if (
        state.action === 'CLOSE_ROOM' ||
        state.action === 'LEAVE_TEAM'
      ) {
        team_name = null;
      }
      socket.emit(state.action, { team_name }, (data) => {
        if (data !== ERROR_MSG && data !== null) {
          setState({
            ...state,
            action: null,
            team_name: null,
            actionDone: true,
          });
        }
        console.log(data);
      });
    }
  });

  // Getting roomData....
  useEffect(() => {
    if (socket !== null && (state.actionDone || state.roomData === null)) {
      socket.emit('GET_ROOM', { room_id }, (data) => {
        if (data !== ERROR_MSG && data !== null) {
          setState({ ...data, actionDone: false, roomData: data });
        }
        console.log('getRoom', data);
      });
    }
  });

  // Setting all the retrieved data into variables to use...
  if (state.roomData !== null && state.roomData !== undefined) {
    roomConfig = state.roomData.config;
    roomTeams = state.roomData.teams;
    roomState = state.roomData.state;
  }

  // Checking if the socket and room_id are not null...
  if (props.location.props === undefined) {
    return <Redirect to='/lobby' />;
  }

  // Initializations....
  room_id = props.location.props.room_id;
  socket = props.location.props.socket;

  // Checking if the user is logged-in...
  const accessToken = localStorage.getItem('access-token');
  if (accessToken === null) {
    return <Redirect to='/' />;
  }

  // Setting Team Cards...
  let team_cards = [];
  for (var team_name in roomTeams) {
    team_cards.push(
      <TeamCard
        setState={setState}
        key={team_name}
        team_name={team_name}
        team={roomTeams[team_name]}
      />
    );
  }

  // Testing Arena....
  //**************************************//
  const onClickTestArena = () => {
    setArenaTestClicked(true);
  };
  if (arenaTestClicked) {
    return <Redirect to={{ pathname: '/arena', props: { socket: socket } }} />;
  }
  //**************************************//

  return (
    <div className='room'>
      <div className='room-header'>
        <NavBar />
      </div>
      {
        /********************************/
        /*This is only for test...*/
        <div className='create-room-button-container'>
          <Button
            type='button'
            onClick={onClickTestArena}
            buttonStyle='btn--primary--normal'
            buttonSize='btn--medium'
          >
            Test Arena
          </Button>
        </div>
        /********************************/
      }
      <div className='room-body'>
        <div className='room-left-section'>
          <div className='room-copy-code'>
            <CopyRoomCodeView room_id={room_id} />
          </div>

          <div className='room-create-team'>
            <CreateTeamView setState={setState} />
          </div>

          <div className='room-details-container'>
            <RoomDetails
              config={roomConfig}
              state={roomState}
              teams={roomTeams}
            />
          </div>
          <div className='room-details-close-room-container'>
            <CloseRoomView setState={setState} />
          </div>
          <div className='room-details-start-competitions-container'>
            <StartCompetitionButton socket={socket} />
          </div>
        </div>
        <div className='room-right-section'>{team_cards}</div>
      </div>
    </div>
  );
};

export default RoomMain;
