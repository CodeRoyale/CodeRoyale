import React, { useState, useEffect } from 'react';
import './RoomMain.css';
import NavBar from '../../components/navBar/NavBar';
import RoomHeader from './RoomHeader';
import RoomRight from './RoomRight';
import FloatingButton from '../../components/floatingButton/FloatingButton';
import TeamCard from '../../components/teamCard/TeamCard';
import CreateTeamView from './CreateTeamView';
import { getRoom } from '../../actions/roomActions';
import { resetTeamAction } from '../../actions/teamActions';
import { connectSocket } from '../../actions/socketActions';
import { TEAM_CREATED, TEAM_JOINED, TEAM_LEFT, ROOM_CLOSED } from '../../utils/constants';
import { Alert } from 'rsuite';
import { connect } from 'react-redux';
import profileData from '../../utils/examples';
import { useHistory } from 'react-router-dom';

const RoomMain = ({
  roomData,
  socketData,
  teamData,
  getRoom,
  resetTeamAction,
  vetoData,
  connectSocket
}) => {
  const [createTeamShow, setCreateTeamShow] = useState(false);
  const socket = socketData.socket;
  const userName = profileData.username.toString();
  const history = useHistory();
  const room_id = localStorage.getItem('room_id');

  // Connecting Socket...
  useEffect(() => {
    connectSocket();
  }, [connectSocket]);

  // Room Details...
  let roomTeams, roomConfig, roomState, roomCompetition, admin;
  if (roomData.data !== null) {
    roomTeams = roomData.data.teams;
    roomConfig = roomData.data.config;
    roomState = roomData.data.state;
    roomCompetition = roomData.data.competition;
    if (roomConfig !== undefined) {
      admin = roomConfig.admin;
    }
  }


  // Get room & check if veto started
  useEffect(() => {
    if (socket !== null && room_id !== null ) {
      getRoom(socket, { room_id });
    }
  }, [room_id, socket, getRoom]);

  // Display Alert on every action...
  useEffect(() => {
    switch (teamData.type) {
      case TEAM_CREATED:
        Alert.success('Team Created');
        resetTeamAction();
        break;
      case TEAM_JOINED:
        Alert.success('You have joined a team');
        resetTeamAction();
        break;
      case TEAM_LEFT:
        Alert.success('You have left a team');
        resetTeamAction();
        break;
      default:
        break;
    }
    if (teamData.error !== null) {
      Alert.error(teamData.error);
      resetTeamAction();
    }
  });

  // Checking all the conditions to be in the room...
  if (room_id === null) {
    history.push('/dashboard');
  }

  if(roomData.type === ROOM_CLOSED){
    history.push('/dashboard');
  }

  if (vetoData.vetoStarted) {
    history.push('/veto');
  }

  // Setting Team Cards...
  let team_cards = [];
  for (var teamName in roomTeams) {
    team_cards.push(
      <TeamCard
        key={teamName}
        team_name={teamName}
        totalUsers={roomConfig['max_perTeam']}
        users={roomTeams[teamName]}
      />
    );
  }

  return (
    <div className='room'>
      <div className='room-header'>
        <NavBar loggedIn={true} />
      </div>
      <div className='room-body'>
        <div className='room-body-left'>
          <div>
            <RoomHeader
              admin={admin}
              config={roomConfig}
              state={roomState}
              teams={roomTeams}
              competition={roomCompetition}
            />
          </div>
          <div className='room-left-body'>{team_cards}</div>
        </div>
        <div className='room-body-right'>
          <RoomRight admin={admin} room_id={room_id} />
        </div>
      </div>
      {userName === admin ? (
        <FloatingButton onClick={() => setCreateTeamShow(true)}>
          +
        </FloatingButton>
      ) : null}

      <CreateTeamView
        show={createTeamShow}
        onClose={() => setCreateTeamShow(false)}
      />
    </div>
  );
};

export const mapStateToProps = (state) => {
  return {
    roomData: state.roomData,
    teamData: state.teamData,
    socketData: state.socketData,
    vetoData: state.vetoData,
  };
};
export default connect(mapStateToProps, { connectSocket, getRoom, resetTeamAction })(RoomMain);
