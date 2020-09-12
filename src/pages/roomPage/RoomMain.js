import React, { useEffect } from 'react';
import './RoomMain.css';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../utils/mapStateToProps';
import { getRoom } from '../../actions/roomActions';
import { resetTeamAction } from '../../actions/teamActions';
import { Alert } from 'rsuite';
import { TEAM_CREATED, TEAM_JOINED, TEAM_LEFT } from '../../utils/constants';
import NavBar from '../../components/navBar/NavBar';
import CreateTeamView from './CreateTeamView';
import TeamCard from './TeamCard';
import CopyRoomCodeView from './CopyRoomCodeView';
import RoomDetails from './RoomDetails';
import CloseRoomView from './CloseRoomView';
import RoomChat from './RoomChat';
import profileData from '../../utils/examples';
import StartCompetitionButton from './StartCompetitionButton';
import { vetoStart } from '../../actions/vetoActions';
import Arena from './Arena';

const RoomMain = ({
  teamData,
  roomData,
  socketData,
  vetoData,
  getRoom,
  vetoStart,
  resetTeamAction,
}) => {
  // TODO: Have to implement, what happens if the user goes to create page again....

  // Initializations...
  const socket = socketData.socket;
  const accessToken = localStorage.getItem('access-token');
  const userName = profileData.username.toString();

  // Initialization of variables...
  let roomTeams, roomConfig, roomState, room_id, admin;
  if (roomData.data !== null) {
    roomTeams = roomData.data.teams;
    roomConfig = roomData.data.config;
    roomState = roomData.data.state;
    if (roomConfig !== undefined) {
      room_id = roomConfig.id;
      admin = roomConfig.admin;
    }
  }

  // Get room & check if veto started
  useEffect(() => {
    if (socket !== null && teamData.type !== '' && room_id !== undefined) {
      getRoom(socket, { room_id });
    }

    if (socket !== null) {
      vetoStart(socket);
    }
  }, [room_id, socket, getRoom, vetoStart, teamData.type]);

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
  if (socket === null) {
    return <Redirect to='/lobby' />;
  }
  if (accessToken === null) {
    return <Redirect to='/' />;
  }

  // If veto started then move to veto page...
  if (vetoData.vetoStarted) {
    return <Redirect to='/veto' />;
  }

  // Setting Team Cards...
  let team_cards = [];
  for (var teamName in roomTeams) {
    team_cards.push(
      <TeamCard
        key={teamName}
        team_name={teamName}
        team={roomTeams[teamName]}
      />
    );
  }

  // Displaying Empty room on the window...
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
          {userName === admin ? <CloseRoomView /> : null}

          <div className='room-copy-code'>
            <CopyRoomCodeView room_id={room_id} admin={admin} />
          </div>

          <div className='room-create-team'>
            {userName === admin ? <CreateTeamView /> : null}
          </div>

          <div className='room-details-container'>
            <RoomDetails
              config={roomConfig}
              state={roomState}
              teams={roomTeams}
            />
          </div>
          <div className='room-details-start-competitions-container'>
            {userName === admin ? <StartCompetitionButton /> : null}
          </div>
          <div>
            <Arena />
          </div>
        </div>
        <div className='room-right-section'>
          <div className='room-right-section-body'>{team_cards}</div>
          <div className='room-right-section-chat'>
            <RoomChat />
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, {
  getRoom,
  vetoStart,
  resetTeamAction,
})(RoomMain);
