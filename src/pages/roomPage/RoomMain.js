import React, { useEffect, useState } from 'react';
import './RoomMain.css';
import { Redirect } from 'react-router';
import { Alert } from 'rsuite';
import NavBar from '../../components/navBar/NavBar';
import CreateTeamView from './CreateTeamView';
import TeamCard from './TeamCard';
import CopyRoomCodeView from './CopyRoomCodeView';
import RoomDetails from './RoomDetails';
import CloseRoomView from './CloseRoomView';
import RoomChat from './RoomChat';
//import StartCompetitionButton from './StartCompetitionButton';
import ERROR_MSG from '../../utils/constants';

const RoomMain = (props) => {
  // TODO: Have to implement, what happens if the user goes to create page again....
  let room_id = null;
  let roomTeams = null;
  let roomConfig = null;
  let roomState = null;
  let socket = null;
  let admin = '';

  const [state, setState] = useState({
    action: null,
    team_name: null,
    actionDone: false,
    roomData: null,
  });
  const { action, actionDone, roomData } = state;

  // Actions in the room...
  useEffect(() => {
    if (action !== null) {
      let team_name = null;
      if (action === 'CREATE_TEAM' || action === 'JOIN_TEAM') {
        team_name = state.team_name;
      } else if (action === 'CLOSE_ROOM' || action === 'LEAVE_TEAM') {
        team_name = null;
      }
      socket.emit(state.action, { team_name }, (data) => {
        if (data !== null) {
          // Giving Alert for every action...
          if (data === ERROR_MSG) {
            Alert.error(ERROR_MSG);
          } else if (data['error'] !== undefined) {
            Alert.error(data.error);
          } else {
            let successMsg = '';
            switch (action) {
              case 'CREATE_TEAM':
                successMsg = 'Team Created Successfully';
                break;
              case 'JOIN_TEAM':
                successMsg = 'You have joined a team';
                break;
              case 'CLOSE_ROOM':
                successMsg = 'Room Closed';
                break;
              case 'LEAVE_TEAM':
                successMsg = 'You have left a team';
                break;
              default:
                successMsg = '';
            }
            Alert.success(successMsg);
          }
          setState({
            ...state,
            action: null,
            team_name: null,
            actionDone: true,
          });
        }
      });
    }
  });

  // Set room dynamically...
  useEffect(() => {
    if (socket !== null) {
      socket.on('ROOM_UPDATED', (data) => {
        if (data !== null) {
          setState({ ...state, actionDone: true });
        }
      });
    }
  });

  // Getting roomData....
  useEffect(() => {
    if (socket !== null && (actionDone || roomData === null)) {
      socket.emit('GET_ROOM', { room_id }, (data) => {
        setState({ ...state, actionDone: false, roomData: data });
      });
    }
  });

  // Setting all the retrieved data into variables to use...
  if (roomData !== null && roomData !== undefined) {
    roomConfig = roomData.config;
    roomTeams = roomData.teams;
    roomState = roomData.state;
    if (roomConfig !== undefined) admin = roomConfig.admin;
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
  for (var teamName in roomTeams) {
    team_cards.push(
      <TeamCard
        setState={setState}
        key={teamName}
        team_name={teamName}
        team={roomTeams[teamName]}
      />
    );
  }

  if (team_cards.length === 0) {
    team_cards = (
      <div className='room-create-team-text-container'>
        <div className='room-create-team-text'>
          <b>
            EMPTY ROOM
            <br />
            CREATE A TEAM
          </b>
        </div>
      </div>
    );
  }

  return (
    <div className='room'>
      <div className='room-header'>
        <NavBar />
      </div>
      <div className='room-body'>
        <div className='room-left-section'>
          <CloseRoomView setState={setState} />

          <div className='room-copy-code'>
            <CopyRoomCodeView room_id={room_id} admin={admin} />
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
          <div className='room-details-start-competitions-container'>
            {/*<StartCompetitionButton socket={socket} />*/}
          </div>
        </div>
        <div className='room-right-section'>{team_cards}</div>
        <div>
          <RoomChat socket={socket} />
        </div>
      </div>
    </div>
  );
};

export default RoomMain;
